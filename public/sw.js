if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return a[e]||(c=new Promise(async c=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=c}else importScripts(e),c()})),c.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},c=(c,a)=>{Promise.all(c.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(c)};self.define=(c,s,i)=>{a[c]||(a[c]=Promise.resolve().then(()=>{let a={};const n={uri:location.origin+c.slice(1)};return Promise.all(s.map(c=>{switch(c){case"exports":return a;case"module":return n;default:return e(c)}})).then(e=>{const c=i(...e);return a.default||(a.default=c),a})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/GVSwnf2LDBbFtQJGSgnmB/_buildManifest.js",revision:"0f0101bf5c6f04dc25aa5ccc3245039e"},{url:"/_next/static/GVSwnf2LDBbFtQJGSgnmB/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/05d954cf.d6609e21b3722034d752.js",revision:"62b6c0e3dc5b9f1d269528398a17c21d"},{url:"/_next/static/chunks/07b9afa9adb98c39e13197a2434c62683ef39d33.aac1e994adbdffd9e7ca.js",revision:"0b99cd248a85d03e6a6872f24d6e4144"},{url:"/_next/static/chunks/1db383de8b6b0645cfd8702f7a2caeebc31bc519.d6dc79c8a6fb74782ae3.js",revision:"a10aac82fb4cc5f1c37cb7c7d17307ae"},{url:"/_next/static/chunks/22dff2dfc37f79e88421ca26cbef6e619d67aa32.7251d6d676bc87997085.js",revision:"bee94d941ef41ffdda87ad79443d0d33"},{url:"/_next/static/chunks/37.3c9daffbd58d4cb36bb2.js",revision:"8ff2e3d80e682838ec8e78edbbdd1d97"},{url:"/_next/static/chunks/38.059610ea8e97856fac71.js",revision:"0f90f3421f9d2b36fc828983dd70f9ca"},{url:"/_next/static/chunks/39.296a966c152738fb5ed7.js",revision:"2c3d4979d6993a7d11a3a3b87feb81d9"},{url:"/_next/static/chunks/3e90bd2fe8eb281f984faff4dd95ee70ac8d0e26.28e583678894f52237e1.js",revision:"78b66d1719a2f82639564f4d57697ab8"},{url:"/_next/static/chunks/3ee09d03438322583c55bd1a840db077bc6dc2ac.9116665f0ead5f4b1d05.js",revision:"6af0b313e3519ac1a8237bf9ea416b24"},{url:"/_next/static/chunks/40.6972f63e4b12c0e38387.js",revision:"3a9ebffb61ff068346a00c234b895e7b"},{url:"/_next/static/chunks/41.7e2a4e7885155613ab0b.js",revision:"2ffc468ddb7825cb19fe62bb74f19b25"},{url:"/_next/static/chunks/42.29d65436cc9fa8966a01.js",revision:"44c0147726a81a845976118719dbe213"},{url:"/_next/static/chunks/72a30a16.582804144b8ffa637cdc.js",revision:"312a30b473f16038073dee395368d160"},{url:"/_next/static/chunks/77acd59c75bf9dfe553bd68a68d7e2171c923ff9.d564f9360d88780662e8.js",revision:"ea1ec0e6e84432e3d9c5c18099305e27"},{url:"/_next/static/chunks/883fd0d165792e3be6eb91ee5cacc61f3f31807d.cbbcdac5c9337f41a452.js",revision:"e44c7db52a995bed379b5e7a160086d4"},{url:"/_next/static/chunks/9.1d17446d1677977bdcba.js",revision:"996b2ab1e3b6cabe62ec22fe3fd38474"},{url:"/_next/static/chunks/b209d96187beadfbb2c66379f3e662b04d4f10e3.c0e222947d2e48258d3e.js",revision:"1f1142b266a37a7abc6600c045e962d9"},{url:"/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.571497dc037a2eebdb9e.js",revision:"f811fc173752d34625454191ad3801e7"},{url:"/_next/static/chunks/commons.d9d757e3cc02bba906d8.js",revision:"c33de3f611f7ec73d6503bfcb28e7131"},{url:"/_next/static/chunks/e6c0a741f776916447cfbbab7f52b84c91edb03b.840df14630131e7446c7.js",revision:"4a9587beaba0dce56bada238483ffbef"},{url:"/_next/static/chunks/e78312c5.831646005857e4ec5e7d.js",revision:"c6d5927b7b8502181d0f4a01586c03a2"},{url:"/_next/static/chunks/f0f79b0494ef5ffb3f91c91e1b4211509ddaca5b.efc9ce518a4d8f8e591f.js",revision:"2d30207af1374e9a9eb24dc584822d74"},{url:"/_next/static/chunks/framework.bf5c4d6f7558bd0190eb.js",revision:"55ebcf25d3ee46adeb366fcd30a715e2"},{url:"/_next/static/chunks/main-fa0f36524f7ca0a42d78.js",revision:"b15e8cdf3b444bb540576d954c721907"},{url:"/_next/static/chunks/pages/_app-9db296b16444b6ed0f95.js",revision:"2ba814d818589a6c7dc27ce8dae598af"},{url:"/_next/static/chunks/pages/_error-17ca2bd67a16047e41eb.js",revision:"89d344ef2f467f41c29951e91a48298d"},{url:"/_next/static/chunks/pages/admin-f7605ea6f3a32747b15d.js",revision:"e1d140200e2dd639ff3ee52ed38c6a14"},{url:"/_next/static/chunks/pages/admin/auditorias-2e83737003d5a1c94b1f.js",revision:"dd0694ebf07d88457f620b2b4d71a38f"},{url:"/_next/static/chunks/pages/admin/clientes-7b73726334d0cfab2dbb.js",revision:"eb27a48e30ea8cb9d0a1ba58e3aecbbd"},{url:"/_next/static/chunks/pages/admin/mercancia-a0c1c3d51e47ab79dd97.js",revision:"ea2ab39a698d929fc5f552cab4bd6e58"},{url:"/_next/static/chunks/pages/admin/pedidos-39685f7e2ff2f9405246.js",revision:"509e25e585f043f726856e1ba1829e55"},{url:"/_next/static/chunks/pages/admin/productos-8e0daccbd724e3cea245.js",revision:"f73c9d5346f7b6250e08f360ea78a1cf"},{url:"/_next/static/chunks/pages/admin/proveedores-a37e7c21c4c7df2c57a3.js",revision:"31b0fa990a7e0fc069e8497e20559820"},{url:"/_next/static/chunks/pages/admin/usuarios-ce2a90c149cfaddabc7a.js",revision:"7178fb514ab9bcce92be1cb15dc7ed40"},{url:"/_next/static/chunks/pages/client-2740880629a286e1afe4.js",revision:"8a184eb3956d1352398d3f7bccb0eb6e"},{url:"/_next/static/chunks/pages/compra-cf03d25248a3fba61cc8.js",revision:"7fd975758a862d92831c5a9b92b22a67"},{url:"/_next/static/chunks/pages/compra/%5Bproduct%5D-a018bcd2896227d168d9.js",revision:"96456f8cc6a8802913e27bbadaac6129"},{url:"/_next/static/chunks/pages/comprar-d65779b9e79735df46b6.js",revision:"d84d9a57cc98b1a0d82bbd2142f6386c"},{url:"/_next/static/chunks/pages/index-a83244061c6db8233775.js",revision:"98db204713ec4be4bbb9b6f5714b94dd"},{url:"/_next/static/chunks/pages/info-a7b90301a162bab88f5f.js",revision:"d8cfdbd327a70ca00e80504e608c5f94"},{url:"/_next/static/chunks/pages/login-76a2f4dbbf81b9ddbb05.js",revision:"041bc46e7de7daba6aef0227ae4d5cdb"},{url:"/_next/static/chunks/polyfills-64fbd71aa04c4608f23f.js",revision:"383921951b141be9a5d8d804a15dd526"},{url:"/_next/static/chunks/webpack-9158282990ccb94e3a61.js",revision:"951983475fd4c77cbc0dfce1ed0f22d0"},{url:"/_next/static/css/3f0ab4d68390d121b253.css",revision:"63570659d8f7ee14ddd746359bed3976"},{url:"/_next/static/css/664b7e695f2fa76e26bd.css",revision:"d5d3cbf67c0e6be51ae5125cb4c498d8"},{url:"/_next/static/media/revicons.57fd05d4ae650374c8deeff7c4aae380.ttf",revision:"17629a5dfe0d3c3946cf401e1895f091"},{url:"/_next/static/media/revicons.a77de540a38981833f9e31bd4c365cc6.eot",revision:"2feb69ccb596730c72920c6ba3e37ef8"},{url:"/_next/static/media/revicons.e8746a624ed098489406e6113d185258.woff",revision:"04eb8fc57f27498e5ae37523e3bfb2c7"},{url:"/icons/android-icon-144x144.png",revision:"2c7addbda1688d33f6dc4964a26b6ac0"},{url:"/icons/android-icon-192x192.png",revision:"05a53169358057cda3f1c785e0c80d7b"},{url:"/icons/android-icon-36x36.png",revision:"8f036dcd5f49ef4f65a963fafe2c6ac7"},{url:"/icons/android-icon-48x48.png",revision:"7547c522c140415c7585c57bd256cfc4"},{url:"/icons/android-icon-72x72.png",revision:"1f4957fa900868e7cdf4671cdd82f7ab"},{url:"/icons/android-icon-96x96.png",revision:"daca57f7eb59d54ac0a9be51a7482ab3"},{url:"/icons/apple-icon-114x114.png",revision:"a50b7f37e99a27a8cc561e8bac575ee4"},{url:"/icons/apple-icon-120x120.png",revision:"bb89ca6c4628efd520ba60c864ae2369"},{url:"/icons/apple-icon-144x144.png",revision:"2c7addbda1688d33f6dc4964a26b6ac0"},{url:"/icons/apple-icon-152x152.png",revision:"4106b332c86aead835df99fa4f94df0d"},{url:"/icons/apple-icon-180x180.png",revision:"10cddbf08831bda4af6baa8cd8811ae0"},{url:"/icons/apple-icon-57x57.png",revision:"e87f57feaef677d5b744aa1d299db43f"},{url:"/icons/apple-icon-60x60.png",revision:"63474a56eaf00a66e8baeff42502c301"},{url:"/icons/apple-icon-72x72.png",revision:"1f4957fa900868e7cdf4671cdd82f7ab"},{url:"/icons/apple-icon-76x76.png",revision:"ef8d87783a6a1738ec2ae1d04017dfc2"},{url:"/icons/apple-icon-precomposed.png",revision:"8c6cb3e98bf9f631906956ebf7c2aca0"},{url:"/icons/apple-icon.png",revision:"8c6cb3e98bf9f631906956ebf7c2aca0"},{url:"/icons/favicon-16x16.png",revision:"12b7792bf31679e22fd79c23e16e4f0f"},{url:"/icons/favicon-32x32.png",revision:"c526fc5ec188a05f7cf7fa78aa137e5a"},{url:"/icons/favicon-96x96.png",revision:"daca57f7eb59d54ac0a9be51a7482ab3"},{url:"/icons/favicon.ico",revision:"4140a704d9f2ecb88e9f24d4714905e5"},{url:"/icons/ms-icon-144x144.png",revision:"2c7addbda1688d33f6dc4964a26b6ac0"},{url:"/icons/ms-icon-150x150.png",revision:"1a17f939af19c579e2ba9f0f526ba049"},{url:"/icons/ms-icon-310x310.png",revision:"6c1eb2aeb9cffc7b9f41ab8d12075b44"},{url:"/icons/ms-icon-70x70.png",revision:"dacd3a1735f9aae6d400e40c230a7cd6"},{url:"/images/cake-roses-stand.jpg",revision:"efc105fe1e15c20eaa74f022b6801595"},{url:"/images/cupcakes-inline.jpg",revision:"59134ef4045a62f72337c2fb411544fe"},{url:"/images/cupcakke.svg",revision:"59819d45aca5bb7d23dfa377a5cc18f4"},{url:"/images/dulces_frios.jpg",revision:"3b23ac35d689d0ed333d19e740c1dbea"},{url:"/images/galletas.jpg",revision:"1b53024b9492ba6f72f67a6b4337e16a"},{url:"/images/header-2.png",revision:"769d79df821ad8fc213faf54be9eba1e"},{url:"/images/login.jpg",revision:"af15b03fddc980e1cc1f7d222b16559d"},{url:"/images/logo.jpg",revision:"ae19fc29e217c98c198d9f6ed75e306b"},{url:"/images/mision.jpg",revision:"62134b72004e72c48a69c3a924dec8f2"},{url:"/images/pasapalos_dulces.jpg",revision:"f4d0dc7621feff8a5e1efbcac71a3e3f"},{url:"/images/tortas.jpg",revision:"5d99a00cf242f9294af053979d0c9911"},{url:"/images/vision.jpg",revision:"aaf78f9f89a2d8c8283fcaaeb5bd2df7"},{url:"/manifest.json",revision:"cf19e305ce429eb56bb7a3b48493009c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
