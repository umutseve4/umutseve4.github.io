import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:4173'},webServer:{command:'python3 -m http.server 4173',port:4173,reuseExistingServer:true},projects:[{name:'desktop',use:{viewport:{width:1440,height:900}}},{name:'mobile',use:{viewport:{width:375,height:812}}}]});
