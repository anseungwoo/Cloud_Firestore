import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { MessageList } from './domain/pubApply/MessageList.model';

export class FirebasePubApply {
  static createPubApply = async (updateData: any): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updatePubDoc = firestore.collection('PubApply').doc(updateData.id);
      const userData = await updatePubDoc.get();
      if (!userData.exists) {
        await updatePubDoc.set(updateData);
      } else {
        await updatePubDoc.update(updateData);
      }
      return true;
    } catch (error) {
      console.log(`[FirebasePub] updatePub e: ${error}`);
      return false;
    }
  };
  static createRockPubApply = async (updateData: any): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updatePubDoc = firestore
        .collection('RockPubApply')
        .doc(updateData.id);
      const userData = await updatePubDoc.get();

      if (!userData.exists) {
        await updatePubDoc.set(updateData);
      } else {
        await updatePubDoc.update(updateData);
      }
      return true;
    } catch (error) {
      console.log(`[FirebasePub] updatePub e: ${error}`);
      return false;
    }
  };
  static createManyPubApply = async (updateData: any): Promise<boolean> => {
    try {
      const firestore = firebase.firestore();
      const updatePubDoc = firestore
        .collection('ManyPubApply')
        .doc(updateData.id);
      const userData = await updatePubDoc.get();

      if (!userData.exists) {
        await updatePubDoc.set(updateData);
      } else {
        await updatePubDoc.update(updateData);
      }
      return true;
    } catch (error) {
      console.log(`[FirebasePub] updatePub e: ${error}`);
      return false;
    }
  };

  static getPubApply = async (): Promise<MessageList | null> => {
    try {
      const firestore = firebase.firestore();
      const accountDoc = firestore.collection('PubApply').doc('user.uid');
      const userData = await accountDoc.get();
      if (userData.exists) {
        return MessageList.fromData(userData.data());
      }

      return null;
    } catch (e) {
      console.log(`[FirebaseAccount] getNowUser e : ${e}`);
      return null;
    }
  };

  static getALLRockPubApply = async (): Promise<MessageList | null> => {
    try {
      const firestore = firebase.firestore();
      const accountDoc = firestore.collection('RockPubApply').doc('user.uid');
      const userData = await accountDoc.get();
      if (userData.exists) {
        return MessageList.fromData(userData.data());
      }

      return null;
    } catch (e) {
      console.log(`[FirebaseAccount] getNowUser e : ${e}`);
      return null;
    }
  };

  static getRockPubApply = async (): Promise<MessageList | null> => {
    try {
      const firestore = firebase.firestore();
      const accountDoc = firestore.collection('ManyPubApply').doc('user.uid');
      const userData = await accountDoc.get();
      if (userData.exists) {
        return MessageList.fromData(userData.data());
      }

      return null;
    } catch (e) {
      console.log(`[FirebaseAccount] getNowUser e : ${e}`);
      return null;
    }
  };
}
