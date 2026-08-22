import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8'); const proof=fs.readFileSync('proof/index.html','utf8');
const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
const anchors=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
const checks={doctype:/<!doctype html>/i.test(html),lang:/<html lang="en">/.test(html),main:/<main id="main">/.test(html),skip:/class="skip" href="#main"/.test(html),canonical:/rel="canonical" href="https:\/\/umutseve4.github.io\/"/.test(html),jsonld:/application\/ld\+json/.test(html),mobile:/@media\(max-width:760px\)/.test(html),reduced:/prefers-reduced-motion:reduce/.test(html),timezone:/timeZone:'Europe\/Istanbul'/.test(html),noopener:[...html.matchAll(/target="_blank"/g)].length===[...html.matchAll(/rel="noopener"/g)].length,uniqueIds:ids.length===new Set(ids).size,validAnchors:anchors.every(a=>ids.includes(a)),noMutableRaw:!proof.includes('/main/docs/figures'),fullShas:(proof.match(/[a-f0-9]{40}/g)||[]).length>=11};
for(const [k,v] of Object.entries(checks)) console.log(`${v?'PASS':'FAIL'} ${k}`); if(Object.values(checks).some(v=>!v)) process.exit(1);
