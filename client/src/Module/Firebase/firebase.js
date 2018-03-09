import * as firebase from 'firebase';
import firebaseui from 'firebaseui'
import config from './config'

if (!firebase.apps.length) {
 firebase.initializeApp(config.initFirebase)
}

const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export {
  auth,
  firebase,
  ui
};
