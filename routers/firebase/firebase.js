const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.project_id,
    clientEmail: process.env.client_email,
    privateKey: process.env.private_key,
  }),
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
