let database;
export async function openStore(){
  if(!('indexedDB'in window))throw new Error('Local storage is unavailable in this browser.');
  database=await new Promise((resolve,reject)=>{
    const req=indexedDB.open('lexitrek-local-v1',1);
    req.onupgradeneeded=()=>req.result.createObjectStore('state');
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
    req.onblocked=()=>reject(new Error('Close another LexiTrek tab to update local storage.'));
  });
  return readState();
}
export function readState(){return new Promise((resolve,reject)=>{const tx=database.transaction('state','readonly');const req=tx.objectStore('state').get('main');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});}
export function writeState(state){return new Promise((resolve,reject)=>{if(!database){reject(new Error('Local storage unavailable'));return;}const tx=database.transaction('state','readwrite');tx.objectStore('state').put(structuredClone(state),'main');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Progress could not be saved.'));});}
