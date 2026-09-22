const test=require('node:test'),assert=require('node:assert/strict');
const {venues,evidence}=require('./venue-expansion');
const {filterVenues,currentFact}=require('./advanced-options');
test('high protein requires a named dish and >=20g sourced protein',()=>{
 const row=venues.find(r=>r[0]==='subway-bpp'),fact=evidence[row[0]].highProtein;
 assert.equal(currentFact(fact,row,'highProtein',new Date('2026-09-22')),true);
 for(const change of [{dish:''},{proteinGrams:19.9},{proteinGrams:'24.8'},{verified:false},{address:'another outlet'}])
 assert.equal(currentFact({...fact,...change},row,'highProtein',new Date('2026-09-22')),false);
 assert.equal(currentFact(fact,row,'highProtein',new Date('2027-09-22')),false);
});
test('three evidenced choices combine with halal and never relax missing matches',()=>{
 const RealDate=global.Date;global.Date=class extends RealDate{constructor(...a){super(...(a.length?a:['2026-09-22T07:00:00Z']));}};
 try{
 const options={enabled:true,highProtein:true,halal:true,area:'Bukit Panjang',priceBand:'Budget'};
 assert.deepEqual(filterVenues(venues,options).venues.map(r=>r[0]).sort(),['stuffd-hillion','subway-bpp','subway-hillion']);
 assert.equal(filterVenues(venues,{...options,childFriendly:true}).venues.length,0);
 assert.equal(filterVenues(venues,{...options,enabled:false}).venues.length,49);
 }finally{global.Date=RealDate;}
});
test('protein is optional and output explains its menu-specific scope',()=>{
 const html=require('node:fs').readFileSync(__dirname+'/index.html','utf8');
 assert.match(html,/<input id="advanced-protein" type="checkbox">/);
 assert.match(html,/not necessarily the same dish/);
 assert.match(html,/not a certification/);
});
