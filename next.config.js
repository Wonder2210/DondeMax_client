const withPWA = require('next-pwa');
module.exports =withPWA({
     pwa: {
      disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
    image:{
        domains:["media.giphy.com"]
    },
      
})
  // other next config