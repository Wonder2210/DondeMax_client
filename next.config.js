const withPWA = require('next-pwa');
module.exports =withPWA({
     pwa: {
    dest: 'public',
  },
    image:{
        domains:["media.giphy.com"]
    },
      
})
  // other next config