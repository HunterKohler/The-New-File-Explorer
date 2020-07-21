/*! no static exports found */function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0});const i=n(/*! events */"events"),o=n(/*! path */"path"),s=n(/*! module */"module");s.wrapper=["(function (exports, require, module, __filename, __dirname, process, global, Buffer) { return function (exports, require, module, __filename, __dirname) { ","\n}.call(this, exports, require, module, __filename, __dirname); });"],e.argv.splice(1,1),n(/*! ../common/reset-search-paths */"./lib/common/reset-search-paths.ts"),n(/*! @electron/internal/common/init */"./lib/common/init.ts");const a=e.electronBinding("v8_util"),c=new i.EventEmitter,l=new i.EventEmitter;a.setHiddenValue(r,"ipc",c),a.setHiddenValue(r,"ipc-internal",l),a.setHiddenValue(r,"ipcNative",{onMessage(e,t,n,r,i){const o=e?l:c;o.emit(t,{sender:o,senderId:i,ports:n},...r)}});const{ipcRendererInternal:d}=n(/*! @electron/internal/renderer/ipc-renderer-internal */"./lib/renderer/ipc-renderer-internal.ts"),{webFrameInit:u}=(n(/*! @electron/internal/renderer/ipc-renderer-internal-utils */"./lib/renderer/ipc-renderer-internal-utils.ts"),n(/*! @electron/internal/renderer/web-frame-init */"./lib/renderer/web-frame-init.ts"));u();const{hasSwitch:p,getSwitchValue:b}=e.electronBinding("command_line"),parseOption=function(e,t,n){return p(e)?n?n(b(e)):b(e):t},h=p("context-isolation"),m=p("node-integration"),f=p("webview-tag"),w=p("hidden-page"),_=p("native-window-open"),E=parseOption("preload",null),g=parseOption("preload-scripts",[],e=>e.split(o.delimiter)),v=parseOption("app-path",null),R=parseOption("guest-instance-id",null,e=>parseInt(e)),y=parseOption("opener-id",null,e=>parseInt(e)),I={ipcRendererInternal:d,guestInstanceId:R,isHiddenPage:w,openerId:y,usesNativeWindowOpen:_};switch(E&&g.push(E),window.location.protocol){case"devtools:":n(/*! @electron/internal/renderer/inspector */"./lib/renderer/inspector.ts");break;case"chrome-extension:":0;break;case"chrome:":break;default:{const{windowSetup:e}=n(/*! @electron/internal/renderer/window-setup */"./lib/renderer/window-setup.ts");e(R,y,w,_)}}if(e.isMainFrame){const{webViewInit:e}=n(/*! @electron/internal/renderer/web-view/web-view-init */"./lib/renderer/web-view/web-view-init.ts");e(h,f,R)}if(h&&a.setHiddenValue(r,"isolated-world-args",I),m){const{makeRequireFunction:t}=require("internal/modules/cjs/helpers");if(r.module=new s("electron/js2c/renderer_init"),r.require=t(r.module),"file:"===window.location.protocol){const t=window.location;let n=t.pathname;if("win32"===e.platform){"/"===n[0]&&(n=n.substr(1));t.hostname.length>0&&e.resourcesPath.startsWith("\\")&&(n=`//${t.host}/${n}`)}r.__filename=o.normalize(decodeURIComponent(n)),r.__dirname=o.dirname(r.__filename),r.module.filename=r.__filename,r.module.paths=s._nodeModulePaths(r.__dirname)}else r.__filename=o.join(e.resourcesPath,"electron.asar","renderer","init.js"),r.__dirname=o.join(e.resourcesPath,"electron.asar","renderer"),v&&(r.module.paths=s._nodeModulePaths(v));window.onerror=function(e,t,n,i,o){return r.process.listenerCount("uncaughtException")>0&&(r.process.emit("uncaughtException",o),!0)}}else h||e.once("loaded",(function(){delete r.process,delete r.Buffer,delete r.setImmediate,delete r.clearImmediate,delete r.global,delete r.root,delete r.GLOBAL}));for(const e of g)try{s._load(e)}catch(t){console.error("Unable to load preload script: "+e),console.error(t),d.send("ELECTRON_BROWSER_PRELOAD_ERROR",e,t)}if(e.isMainFrame){const{securityWarnings:e}=n(/*! @electron/internal/renderer/security-warnings */"./lib/renderer/security-warnings.ts");e(m)}}).call(this,n(/*! @electron/internal/renderer/webpack-provider */"./lib/renderer/webpack-provider.ts").process,n(/*! @electron/internal/renderer/webpack-provider */"./lib/renderer/webpack-provider.ts")._global)},"./lib/renderer/inspector.ts":
