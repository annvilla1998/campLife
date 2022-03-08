'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Images', [
    {
      siteId: 1,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1614474638/campground-photos/v6qtjyvobzru4p6r4rl6.jpg',
    createdAt: new Date(),
    updatedAt: new Date() 
    },
    {
      siteId: 1,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1561310643/campground-photos/b00npespdukz3ibajdev.jpg',
createdAt: new Date(),
updatedAt: new Date() 

    },
    {
      siteId: 1,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1593662531/campground-photos/g8sxi55ewjm7db1wznff.jpg',
    createdAt: new Date(),
    updatedAt: new Date() 
    },
    {
      siteId: 1,
      url: 'https://hipcamp-res.cloudinary.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1629606250/campground-photos/uq2drjc46hl88hjkr3s4/nature-camp-cabin-and-farm-nature-camp-pacific-northwest.jpg', 
    createdAt: new Date(),
    updatedAt: new Date() 
    },
    {
      siteId: 2,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1447142502/campground-photos/waaje5sol4bzjaellxgp.jpg',
    createdAt: new Date(),
    updatedAt: new Date() 
    },
    {
      siteId: 2,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v14471459/campground-photos/zcmya1ii5sbslbiikodw.jpg',
createdAt: new Date(),
updatedAt: new Date() 

    },
    {
      siteId: 2,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1472247288/campground-photos/xtuutkiep3ekc3t1n9wn.jpg',
createdAt: new Date(),
updatedAt: new Date() 

    },
    {
      siteId: 2,
      url: 'https://hipcamp-res.cloudinary.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v14471443/campground-photos/deqddjjea4ilhirvyzai/creekside-camp.jpg',
createdAt: new Date(),
updatedAt: new Date() 

    },
    {
      siteId: 3,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1511391075/campground-photos/vpacl91apk17anx0pohn.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 3,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1510936996/campground-photos/ay4jmaoryiymdlmzaqzb.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 3,
      url: 'https://hipcamp-res.cloudinary.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1511391085/campground-photos/hybouwhana5bqklibxvt/roni-s-perfect-jtree-paradise-primitive-paradise-southern-california.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 4,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1560031511/campground-photos/ym27y5fkwvuktslozq1a.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 4,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1626848433/campground-photos/x75lqtexgqrcugxfljbq.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 4,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1626848435/campground-photos/leg4i8zq6kigir8bdazr.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 4,
      url: 'https://hipcamp-res.cloudinary.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v1541567265/campground-photos/olln3fje0u2628yuiqu0/the-castle-house-estate-the-castle-house-campsite-w-pool-southern-california.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 5,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1632436214/campground-photos/wkb75irec5dwouhidojw.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 5,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1632436030/campground-photos/k8axp6ytlszs0avjtwyl.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 5,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1632436188/campground-photos/xhjdsgncgewbeyd9vre5.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 5,
      url: 'https://hipcamp-res.cloudinary.com/images/c_limit,f_auto,h_1200,q_60,w_1920/v16324356/campground-photos/dfmrccebqy5jzqyc0pti/buford-canyon-south-crow-cabin.jpg',
 createdAt: new Date(),
 updatedAt: new Date() 
    },
    {
      siteId: 6,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1636393595/campground-photos/me80rrhehuw4zytkqcah.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 6,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1636393598/campground-photos/tzxo8oba3kmsjsrlih3x.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 6,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1636393601/campground-photos/vd77xyqez3rzs9aizmbp.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 7,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1633367761/campground-photos/t3c1wcwfffgtmx5usdee.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 7,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1633367768/campground-photos/glozowkltoxm1vqjokfq.jpg',
 createdAt: new Date(),
 updatedAt: new Date() 
    },
    {
      siteId: 7,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1633367763/campground-photos/hmtvurvytd2ujrm4oeen.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 8,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1639081659/campground-photos/e1svrkcuj1af8kjnufwh.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 8,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1622297539/campground-photos/oy8mvwkrprabwpnhgnn5.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 8,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1622297556/campground-photos/kv10zlbho192boxyxkma.jpg',
 createdAt: new Date(),
 updatedAt: new Date() 
    },
    {
      siteId: 9,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1595957796/campground-photos/ukgkl4au4vtz4h8ovwmg.png',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 9,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1595957816/campground-photos/a0ws6nh0rduf3qbgepp3.png',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 9,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1595957820/campground-photos/bh9h8ohdfxpr1wmf6nvj.png',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 10,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1621370953/campground-photos/cm8hd2wdwvdpqbk5mzfw.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 10,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1621370954/campground-photos/fr7bwqyrb1tz9hpqowyp.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 10,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1621370954/campground-photos/gxonjwaulavhmwatz26g.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 11,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1623501369/campground-photos/cr0okloblrmrhehhkede.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 11,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1623604202/campground-photos/iuzpo7qhgmqdg2nzkbww.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 11,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1623604194/campground-photos/pjph1qx3dyjo28qjkr7j.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
    {
      siteId: 12,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1623026618/campground-photos/wnlkcwbnps3si0thfzig.jpg',
   createdAt: new Date(),
   updatedAt: new Date() 
    },
    {
      siteId: 12,
      url: 'https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1623026624/campground-photos/hbioskagnhtt0z2ipiag.jpg',
  createdAt: new Date(),
  updatedAt: new Date() 
    },
  ], {});
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
