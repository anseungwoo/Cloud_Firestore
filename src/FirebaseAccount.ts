import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Account } from './domain/account/Account.model';

export class FirebaseAccount {
  static sendPwResetEmail = async (email: string): Promise<boolean> => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (e) {
      console.log(`[FirebaseAccount] sendPwResetEmail e: ${e}`);
      return false;
    }
  };

  static logOut = async (): Promise<boolean> => {
    try {
      const auth = getAuth();
      await auth.signOut();
      return true;
    } catch (e) {
      console.log(`[FirebaseAccount] logOut e: ${e}`);
      return false;
    }
  };
  static getNowUser = async (): Promise<Account | null> => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const firestore = firebase.firestore();
        const accountDoc = firestore.collection('wwp_users').doc(user.uid);
        const userData = await accountDoc.get();
        if (userData.exists) {
          return Account.fromData(userData.data());
        }
      }

      return null;
    } catch (e) {
      console.log(`[FirebaseAccount] getNowUser e : ${e}`);
      return null;
    }
  };
}
