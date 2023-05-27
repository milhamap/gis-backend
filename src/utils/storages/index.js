const admin = require('firebase-admin')
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require('uuid');
if (!admin.apps.length) {
    admin.initializeApp();
}

const storage = new Storage({
    keyFilename: "admin.json",
});

const uuid = uuidv4();

const uploadImage = (path, filename) => {
    const bucket = storage.bucket("gs://project-gis-2192c.appspot.com");
    bucket.upload(path, {
        destination: `school/${filename}`,
        resumable: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid,
            },
        },
    });
}

module.exports = {
    uploadImage
}