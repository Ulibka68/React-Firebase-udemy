import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.auth.languageCode='ru';
    this.providerGoogle = new app.auth.GoogleAuthProvider();
    //  this.providerGoogle = new this.auth.GoogleAuthProvider();
  }

  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginGoogle() {
    let res = await this.auth.signInWithPopup(this.providerGoogle);
    // let res = await this.auth.signInWithRedirect(this.providerGoogle);

    console.log(res);
    // This gives you a Google Access Token. You can use it to access the Google API.
    console.log(res.credential.accessToken);
    return res;
  }


  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
