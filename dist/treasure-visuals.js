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
function renderClueVisual(w){
  const image=(typeof w.image==="string"&&/^media\/[a-z0-9_-]+\.(svg|png|webp)$/i.test(w.image))
    ? `<img src="${w.image}" alt="${String(w.imageAlt||`Picture showing ${w.word}`).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}" loading="lazy">`
    : `<span class="clue-emoji" role="img" aria-label="${String(`Illustration for ${w.word}`).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}">${String(w.emoji||'🧭').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}</span>`;
  return `<div class="clue-visual"><div class="clue-art">${image}</div><div><strong>Visual clue</strong><small>See the idea, hear the word, then use it in a sentence.</small></div></div>`;
}
export {renderTreasureMap,renderClueVisual};
