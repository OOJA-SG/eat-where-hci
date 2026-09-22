/* Curated 22 September 2026. MUIS public directory searched for Bukit Panjang
 * and Hillion. Listing presence is a dated check, NOT a certificate expiry date.
 * Prices are editorial bands, not quotes. No halal status inferred from a brand.
 */
(function(root){
  'use strict';
  const checkedOn='2026-09-22';
  const muis='https://halal.muis.gov.sg/halal/establishments';
  const hillion='https://www.hillionmall.com.sg/store-directory/';
  const nea='https://www.nea.gov.sg/docs/default-source/hawker-centres-documents/list-of-hcs_19-mar-2025.pdf';
  // id, name, exact outlet address, menu/category, type, price guide, MUIS record
  const records=[
    ['andes-bpp','ANDES — Bukit Panjang Plaza','1 Jelebu Road #03-10 Bukit Panjang Plaza, Singapore 677743','Western grills','Restaurant','Mid-range','EERN21070012653'],
    ['bibimbap-bpp','Bibimbap / Dosirak — Bukit Panjang Plaza','1 Jelebu Road #01-41 Bukit Panjang Plaza, Singapore 677743','Korean rice bowls','Restaurant','Mid-range','EERT20240000092'],
    ['burger-king-bpp','Burger King — Bukit Panjang Plaza','1 Jelebu Road #01-28/29 Bukit Panjang Plaza, Singapore 677743','Burgers','Quick service','Budget','EERN20030011313'],
    ['crave-bpp','CRAVE — Bukit Panjang Plaza','1 Jelebu Road #01-18 Bukit Panjang Plaza, Singapore 677743','Nasi lemak','Quick service','Budget','EEBN21050012335'],
    ['cravy-bpp','Cravy For Crispy Chicken','1 Jelebu Road #01-40 Bukit Panjang Plaza, Singapore 677743','Chicken','Quick service','Budget','EESB20250000693'],
    ['kfc-bpp','KFC — Bukit Panjang Plaza','1 Jelebu Road #02-12/13 Bukit Panjang Plaza, Singapore 677743','Fried chicken','Quick service','Budget','EERN21110013034'],
    ['mcdonalds-bpp',"McDonald's — Bukit Panjang Plaza",'1 Jelebu Road #02-01 Bukit Panjang Plaza, Singapore 677743','Burgers and chicken','Quick service','Budget','EERN20020010972'],
    ['mr-bean-bpp','Mr Bean — Bukit Panjang Plaza','1 Jelebu Road #01-19 Bukit Panjang Plaza, Singapore 677743','Soy drinks and snacks','Quick service','Budget','EESB20220000163'],
    ['now-pizza-bpp','Now Pizza','1 Jelebu Road #01-43 Bukit Panjang Plaza, Singapore 677743','Pizza','Quick service','Budget','EESB20240001234'],
    ['pizza-hut-bpp','Pizza Hut — Bukit Panjang Plaza','1 Jelebu Road #02-14/15 Bukit Panjang Plaza, Singapore 677743','Pizza and pasta','Restaurant','Mid-range','EERN21080012792'],
    ['subway-bpp','Subway — Bukit Panjang Plaza','1 Jelebu Road #02-11 Bukit Panjang Plaza, Singapore 677743','Sandwiches','Quick service','Budget','EERN21110013181'],
    ['super-sushi-bpp','Super Sushi','1 Jelebu Road #01-68 Bukit Panjang Plaza, Singapore 677743','Sushi takeaway','Quick service','Budget','EESB25120000071'],
    ['swensens-bpp',"Swensen's — Bukit Panjang Plaza",'1 Jelebu Road #03-04 Bukit Panjang Plaza, Singapore 677743','Western meals and ice cream','Restaurant','Mid-range','EERN21050012406'],
    ['taste-indonesia-bpp','Taste of Indonesia Express','1 Jelebu Road #01-42 Bukit Panjang Plaza, Singapore 677743','Indonesian food','Restaurant','Budget','EERT26060000029'],
    ['coffee-bean-bpp','The Coffee Bean & Tea Leaf — Bukit Panjang Plaza','1 Jelebu Road #02-08A/09 Bukit Panjang Plaza, Singapore 677743','Cafe','Cafe','Mid-range','EERT25100000005'],
    ['waker-bpp','Waker Chicken — Hawkers Street','1 Jelebu Road #03-08 Bukit Panjang Plaza, Stall 6, Singapore 677743','Chicken stall','Hawker','Budget','EEHK20250000172'],
    ['wokhey-bpp','WOK HEY — Bukit Panjang Plaza','1 Jelebu Road #01-69 Bukit Panjang Plaza, Singapore 677743','Fried rice and noodles','Quick service','Budget','EEBN20090011418'],
    ['al-madina-bangkit','Al Madina Famous Prata Corner','257 Bangkit Road #01-61, Stall 4, Singapore 670257','Prata and Indian food','Hawker','Budget','EEHN22010013075'],
    ['fusion-western-bangkit','Fusion Western Cuisine — Food Hub Bangkit','257 Bangkit Road #01-65, Stall 5, Singapore 670257','Western stall','Hawker','Budget','EEHK20230001173'],
    ['lm-seafood-bangkit','L & M Steamboat / L & M Seafood','257 Bangkit Road #01-65 FoodHub, Stall 7, Singapore 670257','Seafood and steamboat','Hawker','Mid-range','EEHK26030000045'],
    ['tenderbest-bp','Tenderbest — Bukit Panjang Ring Road','259 Bukit Panjang Ring Road #01-34, Stall 2, Singapore 671259','Chicken and Western food','Hawker','Budget','EEHN21120013020'],
    ['4fingers-hillion','4FINGERS Crispy Chicken — Hillion','17 Petir Road #B1-65A Hillion Mall, Singapore 678278','Crispy chicken','Quick service','Budget','EERT20250000879'],
    ['ayam-penyet-hillion','Ayam Penyet President — Hillion','17 Petir Road #B2-57/58 Hillion Mall, Singapore 678278','Indonesian chicken','Restaurant','Budget','EERX21100012948'],
    ['beradik-hillion','Beradik Western — Kopitiam Hillion','17 Petir Road #02-15/16 Kopitiam Food Hall, MR3, Singapore 678278','Western stall','Hawker','Budget','EEHK26080000053'],
    ['big-fish-hillion','Big Fish Small Fish Cafe — Hillion','17 Petir Road #01-27/35/36/37/38/39 Hillion Mall, Singapore 678278','Fish and chips','Restaurant','Mid-range','EERT20240000967'],
    ['dpenyetz-hillion',"D'Penyetz & D'Cendol — Hillion",'17 Petir Road #01-42 Hillion Mall, Singapore 678278','Indonesian meals','Restaurant','Mid-range','EERT20240000247'],
    ['halims-hillion',"Halim's Fish Soup — Kopitiam Hillion",'17 Petir Road #02-15/16/17/18/19/20 Kopitiam Food Hall, Stall 10, Singapore 678278','Fish soup stall','Hawker','Budget','EEHK26060000059'],
    ['kopi-tarts-hillion','Kopi & Tarts — Hillion','17 Petir Road #01-22 Hillion Mall, Singapore 678278','Coffee and tarts','Cafe','Budget','EERT20230000046'],
    ['long-john-hillion',"Long John Silver's — Hillion",'17 Petir Road #B1-57/59 Hillion Mall, Singapore 678278','Fish and chicken','Quick service','Budget','EERN22020013510'],
    ['makisan-hillion','Maki-San — Hillion','17 Petir Road #B2-07 Hillion Mall, Singapore 678278','Sushi and salads','Quick service','Budget','EEBN21030012179'],
    ['mcdonalds-hillion',"McDonald's — Hillion",'17 Petir Road #B1-25-27 Hillion Mall, Singapore 678278','Burgers and chicken','Quick service','Budget','EERN20020010962'],
    ['munchi-hillion','Munchi Pancakes — Hillion','17 Petir Road #B2-44 Hillion Mall, Singapore 678278','Pancakes and snacks','Quick service','Budget','EESB25100000120'],
    ['new-korean-hillion','New Korean Food — Kopitiam Hillion','17 Petir Road #02-15/20 Kopitiam Food Hall, Stall 14, Singapore 678278','Korean stall','Hawker','Budget','EEHK26080000086'],
    ['paris-baguette-hillion','Paris Baguette — Hillion','17 Petir Road #B1-16 Hillion Mall, Singapore 678278','Bakery cafe','Cafe','Mid-range','EERT26020000035'],
    ['pastago-hillion','PastaGo — Hillion','17 Petir Road #B2-37 Hillion Mall, Singapore 678278','Pasta takeaway','Quick service','Budget','EESB20230000614'],
    ['pepper-lunch-hillion','Pepper Lunch Express — Kopitiam Hillion','17 Petir Road #02-15/16/17/18/19/20 Kopitiam, MR4, Singapore 678278','Hotplate meals','Hawker','Budget','EEHK26070000011'],
    ['qiji-hillion','Qi Ji — Hillion','17 Petir Road #B2-16 Hillion Mall, Singapore 678278','Local meals','Quick service','Budget','EERN21060012481'],
    ['sanook-hillion','Sanook Kitchen — Hillion','17 Petir Road #01-17/18 Hillion Mall, Singapore 678278','Thai food','Restaurant','Mid-range','EERT20230000517'],
    ['stuffd-hillion',"Stuff'd — Hillion",'17 Petir Road #B2-40 Hillion Mall, Singapore 678278','Kebabs and bowls','Quick service','Budget','EEBN21110012923'],
    ['subway-hillion','Subway — Hillion','17 Petir Road #02-21 Hillion Mall, Singapore 678278','Sandwiches','Quick service','Budget','EERT20230000165'],
    ['sukiya-hillion','Sukiya Gyudon & Curry — Hillion','17 Petir Road #B2-54 Hillion Mall, Singapore 678278','Japanese rice bowls','Quick service','Budget','EERT20240000799'],
    ['telur-thai-hillion','Telur Thai — Kopitiam Hillion','17 Petir Road #02-15/20 Kopitiam, Stall 13, Singapore 678278','Thai stall','Hawker','Budget','EEHK26060000068'],
    ['soup-spoon-hillion','The Soup Spoon Union — Hillion','17 Petir Road #01-05/06 Hillion Mall, Singapore 678278','Soups and light meals','Restaurant','Mid-range','EERN21080012736'],
    ['torigo-hillion','ToriGO — Hillion','17 Petir Road #B1-37/40 Hillion Mall, Singapore 678278','Japanese-style chicken','Quick service','Budget','EERN21060012477'],
    ['toyomi-hillion','Toyomi Japanese Express — Kopitiam Hillion','17 Petir Road #02-15/20 Kopitiam Food Hall, Stall 12, Singapore 678278','Japanese stall','Hawker','Budget','EEHK26080000052'],
    ['wingstop-hillion','Wingstop — Hillion','17 Petir Road #01-40/41 Hillion Mall, Singapore 678278','Chicken wings','Restaurant','Mid-range','EERT20240001172'],
    ['saizeriya-hillion','Saizeriya — Hillion','17 Petir Road #B1-20/21/22 Hillion Mall, Singapore 678278','Italian food','Restaurant','Budget',null],
    ['bukit-panjang-hawker','Bukit Panjang Hawker Centre & Market','2 Bukit Panjang Ring Road, Singapore 679947','Hawker centre (choose a stall)','Hawker','Budget',null],
    ['senja-hawker','Senja Hawker Centre','2 Senja Close, Singapore 677632','Hawker centre (choose a stall)','Hawker','Budget',null]
  ];
  const evidence={};
  const venues=records.map(([id,name,address,category,type,price,certificateId])=>{
    const sourceUrl=certificateId?muis:id==='saizeriya-hillion'?hillion:nea;
    if(certificateId) evidence[id]={halal:{address,sourceUrl,checkedOn,verified:true,authority:'MUIS',certificateId,listingStatus:'listed',basis:'Exact outlet found in MUIS public directory; recheck the current certificate before ordering.'}};
    const cuisine=type==='Cafe'?'Cafe & bakery':type==='Hawker'?'Local & hawker':/Western|Italian|Pizza|Fish and chips|Burgers|Sandwiches/.test(category)?'Western':'Asian';
    return [id,name,category,address,certificateId?'MUIS outlet directory':id==='saizeriya-hillion'?'Hillion Mall directory':'NEA hawker-centre list',sourceUrl,'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent('Hwa Chong Institution, Singapore')+'&destination='+encodeURIComponent(name+' '+address),cuisine,type,'Different','An additional Bukit Panjang choice. Check the current menu, opening hours and availability before travelling.',true,price,'Bukit Panjang','Bukit Panjang area; some neighbourhood stalls require onward travel from the MRT. Check Directions.',1];
  });
  function fact(id,key,sourceUrl,basis,address){
    const venue=venues.find(r=>r[0]===id);
    if(!evidence[id]) evidence[id]={};
    evidence[id][key]={address:address||(venue&&venue[3]),sourceUrl,checkedOn,verified:true,basis};
  }
  const mcKids='https://www.mcdonalds.com.sg/food-menu/chicken-mcnuggets-4pc-happy-meal';
  const mcMild='https://www.mcdonalds.com.sg/McSaver';
  for(const id of ['mcdonalds-bpp','mcdonalds-hillion','mcdonalds-beauty-world']) {
    const address=id==='mcdonalds-beauty-world'?"144 Upper Bukit Timah Road, #01-39/40 Beauty World Centre, Singapore 588177":undefined;
    fact(id,'childFriendly',mcKids,'Official Singapore menu offers a chicken-nugget Happy Meal. Menu evidence only; not a facilities or seating guarantee.',address);
    fact(id,'nonSpicy',mcMild,'Official Singapore menu explicitly describes Chicken McCrispy Signature as non-spicy. Ask for Signature, not Spicy; confirm outlet availability.',address);
  }
  fact('swensens-bpp','childFriendly','https://swensens.com.sg/wp-content/uploads/2026/03/20260324_SW_GeneralMenu.pdf','Official children’s menu includes chicken strips, pasta and fish meals. Confirm availability at this outlet; no seating guarantee.');
  fact('saizeriya-hillion','childFriendly','https://www.saizeriya.com.sg/menu/','Official Singapore menu includes a dedicated kids menu. Confirm outlet availability; no seating guarantee.');
  fact('wokhey-bpp','nonSpicy','https://pick-up.wokhey.sg/wokhey/location/15/department/5/menu','Bukit Panjang Plaza ordering menu: Egg Fried Rice with Grilled Chicken defaults to No Chilli. Leave chilli add-ons unselected and confirm preparation. Adults can request chilli separately.');
  const api={checkedOn,venues,evidence};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.EatWhereExpansion=api;
})(typeof window!=='undefined'?window:globalThis);
