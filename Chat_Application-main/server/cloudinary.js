const cloudinary=require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dtrnjcfyn', 
    api_key: '922719783693348', 
    api_secret: 'TGHeLFxV6Q0ktfc3iHs88y-cRaM'
  });

  module.exports=cloudinary;