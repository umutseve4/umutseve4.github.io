import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const proof=fs.readFileSync('proof/index.html','utf8');
const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
const anchors=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
const contacts=['mailto:2404005065@ogrenci.sbu.edu.tr','https://www.linkedin.com/in/umut-sever-7851b73a6/','https://github.com/umutseve4'];
const blanks=[...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map(m=>m[0]);
const checks={
 doctype:/<!doctype html>/i.test(html),lang:/<html lang="en">/.test(html),main:/<main id="main">/.test(html),skip:/class="skip" href="#main"/.test(html),
 canonical:/rel="canonical" href="https:\/\/umutseve4.github.io\/"/.test(html),jsonld:/application\/ld\+json/.test(html),mobile:/@media\(max-width:760px\)/.test(html),reduced:/prefers-reduced-motion:reduce/.test(html),timezone:/timeZone:'Europe\/Istanbul'/.test(html),
 safeLinks:blanks.every(x=>/rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(x)),uniqueIds:ids.length===new Set(ids).size,validAnchors:anchors.every(x=>ids.includes(x)),contacts:contacts.every(x=>html.includes(`href="${x}"`)),
 fourProjects:(html.match(/<article class="project(?:\s[^"]*)?"/g)||[]).length===4,dualTracks:html.includes('Data &amp; Reliability')||html.includes('Data & Reliability')&&html.includes('Graphics &amp; Simulation')||html.includes('Graphics & Simulation'),
 ownership:(html.match(/<b>My ownership:<\/b>/g)||[]).length===4,decisions:(html.match(/<b>Key decision:<\/b>/g)||[]).length===4,
 noExternalRuntime:!/@import\s+url|cdnjs|unpkg|jsdelivr|fonts\.googleapis/.test(html),motionLifecycle:/visibilitychange/.test(html)&&/IntersectionObserver/.test(html)&&/cancelAnimationFrame/.test(html),motionEvidence:/motionInitialized/.test(html)&&/rafActive/.test(html)&&/rafStarts/.test(html)&&/tiltActive/.test(html),
 proofPins:!proof.includes('/main/docs/figures')&&(proof.match(/[a-f0-9]{40}/g)||[]).length>=11,boundaries:html.includes('production-ready')&&html.includes('roadmap is not presented as shipped behavior')
};
for(const [name,ok] of Object.entries(checks))console.log(`${ok?'PASS':'FAIL'} ${name}`);
if(Object.values(checks).some(ok=>!ok))process.exit(1);
