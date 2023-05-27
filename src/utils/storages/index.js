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

const bucket = storage.bucket("gs://project-gis-2192c.appspot.com");

const uploadImageSchool = (path, filename) => {
    bucket.upload(path, {
        destination: `school/${filename}`,
        resumable: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid,
            },
        },
    });
    return {
        url: `https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/school%2F`,
        token: uuid
    }
}

const uploadImageLogo = (path, filename) => {
    bucket.upload(path, {
        destination: `logo/${filename}`,
        resumable: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: uuid,
            },
        },
    });
    return {
        url: `https://firebasestorage.googleapis.com/v0/b/project-gis-2192c.appspot.com/o/logo%2F`,
        token: uuid
    }
}

module.exports = {
    uploadImageSchool,
    uploadImageLogo
}