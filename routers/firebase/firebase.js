const admin = require('firebase-admin');
const serviceAccount=require("../../eimentum-firebase-adminsdk-34q6z-7537c5bbe8.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket:`${process.env.PROJECT_ID}.appspot.com`,
   
  });


  const bucket = admin.storage().bucket();


  module.exports = {
    bucket
  };