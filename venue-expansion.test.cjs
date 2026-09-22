const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {venues,evidence}=require('./venue-expansion');
const {filterVenues,currentFact}=require('./advanced-options');
const base=JSON.parse(fs.readFileSync(__dirname+'/index.html','utf8').match(/var VENUES=(.*?);function pickVenueClient/)[1]);
const all=base.concat(venues);
test('49 new distinct places, 85 combined; original list remains 36',()=>{
  assert.equal(base.length,36);assert.equal(venues.length,49);assert.equal(all.length,85);
  assert.equal(new Set(all.map(r=>r[0])).size,85);
  for(const r of venues){assert.equal(r.length,16);assert.ok(r[3]);assert.match(r[5],/^https:\/\//);assert.match(r[6],/^https:\/\/www.google.com\/maps\/dir\//);}
});
test('every evidence address matches its exact catalogue outlet',()=>{
  for(const [id,facts] of Object.entries(evidence))for(const [key,fact] of Object.entries(facts)){
    const row=all.find(r=>r[0]===id);assert.ok(row,id);assert.equal(fact.address,row[3]);
    assert.equal(currentFact(fact,row,key,new Date('2026-09-22')),true,id+' '+key);
  }
});
test('dated checks reject stale, future, mismatched and non-MUIS certification records',()=>{
  const row=venues[0],f=evidence[row[0]].halal;
  assert.equal(currentFact(f,row,'halal',new Date('2026-10-23')),false);
  assert.equal(currentFact(f,row,'halal',new Date('2026-09-21')),false);
  for(const change of [{address:'Other branch'},{sourceUrl:'https://muis.gov.sg.example.com/'},{authority:'Restaurant claim'},{certificateId:''},{listingStatus:'withdrawn'},{checkedOn:'invalid'}])assert.equal(currentFact({...f,...change},row,'halal',new Date('2026-09-22')),false);
});
test('live event filters have exact evidenced matches without relaxation',()=>{
  // Freeze date for deterministic regression of the event snapshot.
  const RealDate=global.Date;global.Date=class extends RealDate{constructor(...args){super(...(args.length?args:['2026-09-22T04:00:00Z']));}};
  try{
    assert.equal(filterVenues(all,{enabled:true,halal:true}).venues.length,46);
    assert.equal(filterVenues(all,{enabled:true,childFriendly:true}).venues.length,5);
    assert.equal(filterVenues(all,{enabled:true,nonSpicy:true}).venues.length,4);
    const matches=filterVenues(all,{enabled:true,area:'Bukit Panjang',priceBand:'Budget',adults:2,children:1,halal:true,childFriendly:true,nonSpicy:true}).venues;
    assert.deepEqual(matches.map(r=>r[0]).sort(),['mcdonalds-bpp','mcdonalds-hillion']);
    assert.equal(filterVenues(all,{enabled:true,area:'Bukit Panjang',priceBand:'Treat',halal:true,childFriendly:true,nonSpicy:true}).venues.length,0);
    assert.equal(filterVenues(base,{enabled:false,halal:true}).venues.length,36);
  }finally{global.Date=RealDate;}
});
