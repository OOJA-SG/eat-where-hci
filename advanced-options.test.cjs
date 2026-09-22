const test = require('node:test');
const assert = require('node:assert/strict');
const { filterVenues, planningSummary, EVIDENCE, mount } = require('./advanced-options.js');
const rows = [['a','A','','Address A',,,,,,,,true,'Budget','Tan Kah Kee MRT'], ['b','B','','Address B',,,,,,,,true,'Treat','Beauty World MRT']];
test('disabled mode ignores all preferences and invalid values', () => {
  assert.deepEqual(filterVenues(rows,{enabled:false,area:'Nowhere',adults:-1,halal:true}).venues, rows);
});
test('area and price band filter without changing source rows', () => {
  assert.deepEqual(filterVenues(rows,{enabled:true,area:'Beauty World MRT',priceBand:'Treat'}).venues,[rows[1]]);
  assert.equal(rows.length,2);
});
test('no region match never falls back',()=>assert.equal(filterVenues(rows,{enabled:true,area:'Bukit Panjang'}).venues.length,0));
test('advanced mode also respects the original cuisine, venue and discovery filters',()=>{
  const row=['x','X','','Address',null,null,null,'Asian','Restaurant','Familiar',null,true,'Budget','Tan Kah Kee MRT'];
  assert.equal(filterVenues([row],{enabled:true,cuisine:'Asian',venueType:'Restaurant',discovery:'Familiar'}).venues.length,1);
  for(const option of [{cuisine:'Western'},{venueType:'Cafe'},{discovery:'Different'}]) assert.equal(filterVenues([row],{enabled:true,...option}).venues.length,0);
});
for(const field of ['halal','childFriendly','nonSpicy']) test(field+' requires outlet evidence',()=>{
  assert.equal(filterVenues(rows,{enabled:true,[field]:true}).venues.length,0);
});
test('registry ships empty rather than invented certifications',()=>assert.equal(Object.keys(EVIDENCE).length,0));
test('party size is planning only, not venue suitability',()=>{
  assert.equal(filterVenues(rows,{enabled:true,adults:2,children:1}).venues.length,2);
  assert.match(planningSummary({enabled:true,adults:2,children:1}),/not a seating guarantee/);
  assert.doesNotMatch(planningSummary({enabled:true,budget:30,adults:2,children:1}),/budget|S\$/);
});
test('invalid enabled planning values fail clearly',()=>assert.match(filterVenues(rows,{enabled:true,adults:-1}).error,/adult/i));
test('disabled planning is blank',()=>assert.equal(planningSummary({enabled:false}),''));
test('total budget is removed while price guide remains',()=>{
  const html=require('node:fs').readFileSync(__dirname+'/index.html','utf8');
  assert.doesNotMatch(html,/advanced-budget|Total budget/);
  assert.match(html,/advanced-price/);
});
test('changing mode clears results and dispatches cancellation signal',()=>{
  const ids=['advanced-toggle','advanced-panel','advanced-area','result'];
  const elements=Object.fromEntries(ids.map(id=>[id,{checked:false,hidden:true,className:'has-result',listeners:{},addEventListener(name,fn){this.listeners[name]=fn;},setAttribute(){},appendChild(){},replaceChildren(){this.cleared=true;}}]));
  const events=[];
  global.document={getElementById:id=>elements[id],createElement:()=>({}),dispatchEvent:event=>events.push(event.type)};
  mount(rows,()=>({}));
  elements['advanced-toggle'].checked=true;
  elements['advanced-toggle'].listeners.change();
  assert.equal(elements['advanced-panel'].hidden,false);
  assert.equal(elements.result.cleared,true);
  assert.equal(elements.result.className,'');
  assert.deepEqual(events,['eatwhere-preferences-change']);
  delete global.document;
});
test('integration cancels stale choices and preserves original catalogue byte-for-byte',()=>{
  const fs=require('node:fs');
  const cp=require('node:child_process');
  const html=fs.readFileSync(__dirname+'/index.html','utf8');
  const original=cp.execFileSync('git',['show','HEAD:index.html'],{cwd:__dirname,encoding:'utf8'});
  const catalogue=s=>s.match(/var VENUES=(.*?);function pickVenueClient/)[1];
  assert.equal(catalogue(html),catalogue(original));
  assert.match(html,/if\(version!==choiceVersion\)return/);
  assert.match(html,/lastVenue='';choiceVersion\+\+/);
});
test('missing advanced dependency leaves original picker available and disables advanced controls',()=>{
  const fs=require('node:fs');
  const vm=require('node:vm');
  const html=fs.readFileSync(__dirname+'/index.html','utf8');
  const block=html.slice(html.indexOf('      var advanced;'),html.indexOf("      var pickButton="));
  assert.ok(block.length>0,'fallback initialization block exists');
  const elements={
    'advanced-toggle':{checked:true,disabled:false},
    'advanced-panel':{hidden:false},
    'advanced-availability':{textContent:''}
  };
  const sentinel={status:'ok'};
  const context={window:{},VENUES:[],pickVenueClient:()=>sentinel,document:{getElementById:id=>elements[id]}};
  vm.runInNewContext(block,context);
  assert.equal(context.advanced.pick({}),sentinel);
  assert.equal(context.advanced.enabled(),false);
  assert.equal(elements['advanced-toggle'].checked,false);
  assert.equal(elements['advanced-toggle'].disabled,true);
  assert.equal(elements['advanced-panel'].hidden,true);
  assert.match(elements['advanced-availability'].textContent,/unavailable.*original lunch picker/i);
});
