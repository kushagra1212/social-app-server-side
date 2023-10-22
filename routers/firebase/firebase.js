const { default: axios } = require('axios');
const admin = require('firebase-admin');

let bucket = null;

const createFirebaseBuck = async () => {
  const res = await axios.get(process.env.FIREBASE_JSON_FILE_URL);
  admin.initializeApp({
    credential: admin.credential.cert(res.data),
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  });
  bucket = admin.storage().bucket();
};
createFirebaseBuck();
module.exports = {
  bucket,
};
