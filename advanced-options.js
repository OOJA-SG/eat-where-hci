/* Optional advanced search. Original catalogue is untouched. No dietary facts are inferred. */
(function (root) {
  'use strict';
  const expansion = typeof module !== 'undefined' && module.exports ? require('./venue-expansion.js') : root.EatWhereExpansion;
  const EVIDENCE = Object.freeze(expansion ? expansion.evidence : {});
  function currentFact(fact, row, key, now = new Date()) {
    if (!fact || fact.address !== row[3] || !/^https:\/\//.test(fact.sourceUrl || '') || !/^\d{4}-\d{2}-\d{2}$/.test(fact.checkedOn || '') || fact.verified !== true) return false;
    const age=(Date.parse(now.toISOString().slice(0,10))-Date.parse(fact.checkedOn))/86400000;
    if (!Number.isFinite(age) || age < 0 || age > (key==='halal'?30:180)) return false;
    if (key !== 'halal') return Boolean(fact.basis);
    return fact.authority==='MUIS' && /^https:\/\/(?:halal\.)?muis\.gov\.sg\//.test(fact.sourceUrl) && Boolean(fact.certificateId) && fact.listingStatus==='listed';
  }
  function filterVenues(rows, options, evidence = EVIDENCE) {
    const o = options || {};
    if (!o.enabled) return {venues: rows};
    const adults = Number(o.adults === undefined ? 2 : o.adults);
    const children = Number(o.children === undefined ? 0 : o.children);
    if (!Number.isInteger(adults) || adults < 1 || adults > 50) return {venues:[], error:'Enter 1–50 adults.'};
    if (!Number.isInteger(children) || children < 0 || children > 50) return {venues:[], error:'Enter 0–50 children.'};
    return {venues: rows.filter(r => {
      if (['cuisine','venueType','discovery'].some((key,index) => o[key] && o[key] !== 'Any' && r[7+index] !== o[key])) return false;
      if (r[11] !== true || (o.area && o.area !== 'Any' && r[13] !== o.area) || (o.priceBand && o.priceBand !== 'Any' && r[12] !== o.priceBand)) return false;
      return ['halal','childFriendly','nonSpicy'].every(key => {
        if (!o[key]) return true;
        const fact = evidence[r[0]] && evidence[r[0]][key];
        return currentFact(fact,r,key);
      });
    })};
  }
  function planningSummary(o) {
    if (!o.enabled) return '';
    return 'Meal plan: '+o.adults+' adult(s), '+o.children+' child(ren). Planning context only — not a seating guarantee. Table availability is not matched.';
  }
  function mount(rows, legacyPick) {
    rows=rows.concat(expansion?expansion.venues:[]);
    const doc = root.document;
    const toggle = doc.getElementById('advanced-toggle');
    const panel = doc.getElementById('advanced-panel');
    const area = doc.getElementById('advanced-area');
    const coverage=doc.getElementById('advanced-coverage');
    if(coverage) coverage.textContent=rows.length+' curated places in advanced search. '+['halal','childFriendly','nonSpicy'].map(key=>rows.filter(r=>currentFact(EVIDENCE[r[0]]&&EVIDENCE[r[0]][key],r,key)).length+' '+({halal:'MUIS-listed',childFriendly:'with children’s menu evidence',nonSpicy:'with explicitly non-spicy menu evidence'})[key]).join(' · ')+'. These counts overlap. Checks dated '+(expansion?expansion.checkedOn:'unavailable')+'.';
    [...new Set(rows.map(r=>r[13]).concat('Bukit Panjang'))].forEach(value=>{
      const option = doc.createElement('option'); option.value=value; option.textContent=value; area.appendChild(option);
    });
    function read() {
      return {enabled:toggle.checked,area:area.value,priceBand:doc.getElementById('advanced-price').value,adults:doc.getElementById('advanced-adults').value,children:doc.getElementById('advanced-children').value,halal:doc.getElementById('advanced-halal').checked,childFriendly:doc.getElementById('advanced-child').checked,nonSpicy:doc.getElementById('advanced-spice').checked};
    }
    function changed() {
      panel.hidden = !toggle.checked;
      toggle.setAttribute('aria-expanded',String(toggle.checked));
      const result=doc.getElementById('result'); result.replaceChildren(); result.className='';
      doc.dispatchEvent(new Event('eatwhere-preferences-change'));
    }
    toggle.addEventListener('change',changed);
    panel.addEventListener('input',changed);
    panel.addEventListener('change',changed);
    return {enabled:()=>toggle.checked,pick(request) {
      const o=read();
      if (!o.enabled) return legacyPick(request);
      const filtered=filterVenues(rows,Object.assign({},request,o));
      if (filtered.error) return {status:'empty',message:filtered.error};
      let choices=filtered.venues;
      if (!choices.length) return {status:'empty',message:'No evidenced matches for this combination. The curated list is not exhaustive, and expired checks are excluded. No preferences have been relaxed. Broaden area or price, change a preference, or switch advanced options off.'};
      const matchCount=choices.length;
      if (choices.length>1) choices=choices.filter(r=>r[1]!==request.excludeName);
      const r=choices[Math.floor(Math.random()*choices.length)];
      const reasons=['halal','childFriendly','nonSpicy'].filter(key=>currentFact(EVIDENCE[r[0]]&&EVIDENCE[r[0]][key],r,key)).map(key=>({label:{halal:'MUIS directory match',childFriendly:'Children’s menu',nonSpicy:'Non-spicy menu option'}[key],...EVIDENCE[r[0]][key]}));
      return {status:'ok',planning:planningSummary(o),matchCount,reasons,venue:{name:r[1],category:r[2],area:r[3],sourceLabel:r[4],sourceUrl:r[5],directionsUrl:r[6],explanation:r[10],priceBand:r[12],nearestMrt:r[13],accessNote:r[14]}};
    }};
  }
  const api={EVIDENCE,filterVenues,planningSummary,mount,currentFact};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.EatWhereAdvanced=api;
})(typeof window !== 'undefined' ? window : globalThis);
