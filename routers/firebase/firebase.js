require('dotenv').config();
const admin = require('firebase-admin');






admin.initializeApp({
    credential: admin.credential.cert({
      "type": procees.evn.type,
      "project_id":  procees.evn.project_id,
      "private_key_id":  procees.evn.private_key_id,
      "private_key":  procees.evn.private_key,
      "client_email": procees.evn.client_email,
      "client_id":  procees.evn.client_id,
      "auth_uri":  procees.evn.auth_uri,
      "token_uri": procees.evn.token_uri,
      "auth_provider_x509_cert_url": procees.evn.auth_provider_x509_cert_url,
      "client_x509_cert_url":  procees.evn.client_x509_cert_url,
    }),
    storageBucket:"eimentum.appspot.com"
  });


  const bucket = admin.storage().bucket();

  module.exports = {
    bucket
  };