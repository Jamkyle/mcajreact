var admin = require("firebase-admin");

var serviceAccount = require("../secret/planning-f45d1-firebase-adminsdk-tr8ob-6211ce23a6.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://planning-f45d1.firebaseio.com"
  });

exports.database = () => {
  return admin.database()
}
