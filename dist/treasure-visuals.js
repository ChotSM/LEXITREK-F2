// Treasure-map visual and multimodal illustration fallback. No changes to learning records.
function renderTreasureMap(position=0,lap=1){
  const pos=Math.max(0,Math.min(30,Number(position)||0));
  const points=Array.from({length:31},(_,i)=>{const t=i/30;return {x:86+625*t,y:354-248*t+Math.sin(t*3.5*Math.PI)*57};});
  const path=points.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const travelled=points.slice(0,pos+1).map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const boat=points[pos];
  return `<svg class="treasure-map-svg" viewBox="0 0 800 455" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Treasure map: checkpoint ${pos} of 30, voyage ${lap}. Your ship is at the highlighted marker.">
  <title>Treasure hunt voyage</title><desc>Islands, a pirate cove, a cave, an ocean route and a treasure chest mark the journey. A boat shows your current checkpoint.</desc>
  <defs>
    <linearGradient id="voyageSea" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#87dce0"/><stop offset=".58" stop-color="#3aadc2"/><stop offset="1" stop-color="#196a94"/></linearGradient>
    <linearGradient id="sand" x1="0" x2="1"><stop stop-color="#ffe8ad"/><stop offset="1" stop-color="#e9c77b"/></linearGradient>
    <pattern id="waves" width="76" height="50" patternUnits="userSpaceOnUse"><path d="M0 25q17-12 34 0t34 0" stroke="#efffff" stroke-width="2" fill="none" opacity=".22"/></pattern>
  </defs>
  <rect width="800" height="455" fill="url(#voyageSea)"/><rect width="800" height="455" fill="url(#waves)"/>
  <path d="M0 0H800V455H0Z" fill="none" stroke="#fff8d9" stroke-width="15" opacity=".3"/>
  <g aria-hidden="true">
    <ellipse cx="155" cy="355" rx="120" ry="62" fill="#246e66" opacity=".19"/><ellipse cx="151" cy="348" rx="109" ry="50" fill="url(#sand)"/><ellipse cx="155" cy="335" rx="65" ry="27" fill="#71b38b"/>
    <path d="M106 350l14-58" stroke="#8d5732" stroke-width="7" stroke-linecap="round"/><path d="M121 289q-25-19-46-1 25-7 46 8M119 291q24-24 45-8-28-4-43 15M120 290q-6-29-25-36 13 25 24 43" stroke="#27764d" stroke-width="8" fill="none" stroke-linecap="round"/>
    <ellipse cx="401" cy="214" rx="93" ry="42" fill="#195d77" opacity=".21"/><ellipse cx="402" cy="206" rx="91" ry="40" fill="url(#sand)"/><path d="M340 216q57-84 119 0Z" fill="#647f7f"/><path d="M364 216q38-53 77 0Z" fill="#203e4b"/><path d="M340 216h119" stroke="#cdaf6a" stroke-width="7"/>
    <ellipse cx="669" cy="117" rx="102" ry="50" fill="#174c80" opacity=".24"/><ellipse cx="663" cy="108" rx="94" ry="40" fill="url(#sand)"/><ellipse cx="651" cy="105" rx="53" ry="22" fill="#80b98d"/>
    <g transform="translate(690 78)"><rect x="-26" y="15" width="55" height="37" rx="5" fill="#8e4826" stroke="#532e1d" stroke-width="4"/><path d="M-31 17q4-32 33-32 27 0 32 32Z" fill="#d47d35" stroke="#63361d" stroke-width="4"/><path d="M-10 15h23v37h-23Z" fill="#f2bd46"/><circle cy="30" r="5" fill="#654021"/></g>
    <g transform="translate(495 339)"><path d="M0 0l28-17 21 18-22 15Z" fill="#f5e7bf" opacity=".92"/><path d="M14-3l26 29m0-29L14 26" stroke="#af4533" stroke-width="7" stroke-linecap="round"/></g>
    <g transform="translate(752 35)" fill="none" stroke="#e9fbf3" stroke-width="3" opacity=".9"><circle r="18"/><path d="M0-29V29M-29 0H29"/><path d="M-9-9L10 10M-9 9L10-10" stroke-width="1.5"/></g>
  </g>
  <path d="${path}" stroke="#114c65" stroke-width="11" stroke-linecap="round" opacity=".15" fill="none"/><path d="${path}" stroke="#fff6cf" stroke-width="5" stroke-dasharray="4 11" stroke-linecap="round" fill="none"/>
  ${pos>0?`<path d="${travelled}" stroke="#ffce55" stroke-width="6" stroke-linecap="round" fill="none"/>`:''}
  ${points.filter((_,i)=>i>0&&i<30&&i%5===0).map(p=>`<circle cx="${p.x}" cy="${p.y}" r="7" fill="#fff2cb" stroke="#b47834" stroke-width="3"/>`).join('')}
  <g transform="translate(${boat.x.toFixed(1)} ${boat.y.toFixed(1)})" aria-hidden="true">
    <circle r="27" fill="#fff6cf" opacity=".75"/><path d="M-18 9h40l-11 14h-20Z" fill="#663f2d" stroke="#fff6d5" stroke-width="2"/><path d="M1-29V9M2-26L18 6H2Z" fill="#ffffff" stroke="#174a71" stroke-width="2"/><path d="M0-26l-15 28H0Z" fill="#efbb5c"/><path d="M3-29h18l-18 9Z" fill="#d85e43"/>
  </g><rect x="16" y="408" width="208" height="33" rx="16" fill="#123c57" opacity=".9"/>
  <text x="29" y="429" font-size="15" font-weight="700" fill="white">⛵ CHECKPOINT ${pos} / 30</text></svg>`;
}
// Context scenes distinguish an action or profession from a related object.
const sceneParts = {
  cook: ['A person stirring food in a pan on a stove.', `<path d="M120 95h100v46H120z" fill="#638798"/><path d="M129 95h72l-7 19h-54z" fill="#294b60"/><path d="m199 98 22-8"/><path d="M151 84q-8-9 1-17m17 17q-8-9 1-17" stroke="#83a6b3"/><circle cx="71" cy="42" r="17" fill="#d6a17d"/><path d="M50 68h43v69H50z" fill="#12a29c"/><path d="m89 77 37 14 27-14M55 134v16m29-16v16"/><path d="m154 72 8 28" stroke="#ac713f"/>`],
  draw: ['A person using a pencil to make a picture of a tree on paper.', `<circle cx="48" cy="42" r="17" fill="#d6a17d"/><path d="M28 65h44v71H28z" fill="#e5a34c"/><path d="M75 88h135v55H75z" fill="#fff"/><path d="M160 130V98m-17 13 17-23 18 23z" fill="#6bb78b"/><path d="m69 77 37 21 29 14"/><path d="m127 107 22 15" stroke="#ce8740" stroke-width="7"/>`],
  writer: ['A person using a pen to write lines of text on a page at a desk.', `<path d="M91 96h136v13H91z" fill="#c59e75"/><path d="M107 109v37m102-37v37"/><circle cx="51" cy="37" r="17" fill="#d6a17d"/><path d="M31 61h42v72H31z" fill="#7182bc"/><path d="m68 75 43 14 29-8M44 133v16m21-16v16"/><path d="m134 74 14 18" stroke="#e59a3a" stroke-width="6"/><path d="M133 93h62l-12-27h-47z" fill="#fff"/><path d="M153 74h26m-24 7h23m-23 6h26" stroke="#507a8f" stroke-width="2"/>`],
  pilot: ['A person at the controls of an aircraft, with sky visible through the cockpit windows.', `<path d="M14 18h212v81H14z" fill="#b9e4f2"/><path d="M15 55h210M120 18v79" stroke="#8aaab7"/><path d="M15 105h210v43H15z" fill="#638798"/><circle cx="71" cy="48" r="16" fill="#d6a17d"/><path d="M48 38h45l-9-12H55zM48 72h46v60H48z" fill="#254f77"/><path d="m91 88 43 26m0-9v23m-10-22h21"/><circle cx="176" cy="122" r="10" fill="#f6d879"/><circle cx="207" cy="122" r="7" fill="#a6d3d4"/>`],
  engineer: ['A person in a safety helmet comparing a bridge design with a bridge being built.', `<path d="M112 98h118m-106 0V55l42 43 47-43v43M124 55l89 0" stroke="#598b9f"/><path d="M126 107v25m84-25v25"/><circle cx="45" cy="44" r="17" fill="#d6a17d"/><path d="M25 40h41l-6-17H31z" fill="#f1bd4c"/><path d="M25 70h44v70H25z" fill="#12a29c"/><path d="m63 78 23 18"/><path d="M65 84h42v47H65z" fill="#d0edf5"/><path d="m71 115 13-18 15 18M73 121h25" stroke="#4c7a9d" stroke-width="2"/>`],
  windy: ['A tree bending sideways, leaves blowing through the air and a hat being blown away.', `<path d="M15 140h207" stroke="#8db794"/><path d="m65 135 14-67" stroke="#a57b54" stroke-width="8"/><path d="M79 69q-37-18-37-37 26-27 64-5 32 12 29 31-17 17-56 11" fill="#6cb68a" stroke="none"/><path d="M131 30h72q18 0 12-11M136 60h74q17 0 11 11M132 97h72" stroke="#6ba9bf"/><path d="m148 82 15 7-15 4m-40 23 16 6-15 5" fill="#6cb68a" stroke="none"/><path d="m169 118 30-9 10 13-42 12z" fill="#e5a34c" stroke="none"/>`],
  gravity: ['An apple falling from a branch towards the ground, with a downward arrow.', `<path d="M15 142h210" stroke="#84b58d"/><path d="M37 141V24h118" stroke="#a57b54" stroke-width="9"/><path d="M135 65q-18-13-23 4-8 26 20 29 28-3 21-29-5-17-18-4" fill="#df7968" stroke="none"/><path d="m134 63 3-12" stroke="#568363"/><path d="M182 66v55m-11-12 11 14 11-14" stroke="#3e849e"/><path d="M132 108v21" stroke="#a1b7c1" stroke-dasharray="4 6"/>`],
  flood: ['Water covering a road and the lower part of houses, with trees standing in the water.', `<path d="M32 64h64v71H32zM140 54h64v81h-64z" fill="#e7c68e"/><path d="m23 64 41-35 41 35m26-10 41-32 41 32" fill="#b57c60"/><path d="M54 89h21v40m88-44h21v44" fill="#568797"/><path d="M8 111q25-12 51 0t51 0 51 0 72 0v41H8z" fill="#75b7d5" stroke="none"/><path d="M19 130q18-9 36 0m22 7q19-9 39 0m30-7q18-9 36 0" stroke="#e3f4f6"/>`],
  liquid: ['A tilted jug pouring a stream into a glass; the water has a flat surface inside the glass.', `<path d="M36 34h60v58H36z" fill="#d3edf4" transform="rotate(24 66 63)"/><path d="M96 45q31-5 24 18l-18 3" fill="none"/><path d="m102 87 30 27" stroke="#4c9ec4" stroke-width="7"/><path d="m119 94 9 51h63l8-51" fill="#e3f3f8"/><path d="m125 117 5 26h59l5-26z" fill="#6fb7d5" stroke="none"/>`],
  gas: ['A closed container with dots spread throughout it and arrows showing movement in different directions.', `<rect x="44" y="25" width="152" height="120" rx="13" fill="#e1f2f6"/><g fill="#779cbd" stroke="none"><circle cx="65" cy="49" r="5"/><circle cx="119" cy="43" r="5"/><circle cx="177" cy="59" r="5"/><circle cx="84" cy="94" r="5"/><circle cx="155" cy="104" r="5"/><circle cx="65" cy="129" r="5"/><circle cx="114" cy="126" r="5"/><circle cx="179" cy="132" r="5"/></g><path d="m88 59 18 14m-11-1 12 2-3-11m41-10-11 18m0-10-1 12 11-4m-30 26 19-1m-6-6 9 6-8 7" stroke="#49949f"/>`]
};
const escapeArt = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const hasClueScene = w => !!sceneParts[w.word] || (typeof w.image==='string'&&/^media\/[a-z0-9_-]+\.(svg|png|webp)$/i.test(w.image));
function renderClueVisual(w){
  const scene=sceneParts[w.word];
  const image=scene
    ? `<svg class="clue-scene" viewBox="0 0 240 165" role="img" aria-label="${escapeArt(scene[0])}"><rect width="240" height="165" rx="14" fill="#f1f8f6"/><g stroke="#355768" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">${scene[1]}</g></svg>`
    : (typeof w.image==='string'&&/^media\/[a-z0-9_-]+\.(svg|png|webp)$/i.test(w.image))
      ? `<img src="${w.image}" alt="${escapeArt(w.imageAlt||`Picture showing ${w.word}`)}" loading="lazy">`
      : `<span class="clue-emoji" role="img" aria-label="${escapeArt(`Illustration for ${w.word}`)}">${escapeArt(w.emoji||'🧭')}</span>`;
  return `<div class="clue-visual ${scene?'has-scene':''}"><div class="clue-art">${image}</div><div><strong>Visual clue</strong><small>Look at the whole scene. What idea does it show?</small></div></div>`;
}
export {renderTreasureMap,renderClueVisual};
