import { auth, dbRef } from './firebaseConfig';
import { 
  signInWithEmailAndPassword,
} from "firebase/auth";
/*
* Service file call API
*/
export default class memberServices {

  static signInByFireBase = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
}