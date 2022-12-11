import { auth, dbRef } from './firebaseConfig';
import { 
  signInWithEmailAndPassword,
} from "firebase/auth";
import { child, get, onValue } from 'firebase/database';
/*
* Service file call API
*/
export default class memberServices {

  static getAllProducts = () => {
    try {
      const snapshot = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
      console.log(snapshot);
      return [];
    } catch(err) {
      console.log(err);
    }
  }

  static signInByFireBase = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
}