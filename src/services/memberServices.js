import { db, colRef, auth } from './firebaseConfig';
import { doc, getDocs, updateDoc } from 'firebase/firestore';
import { 
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
/*
* Service file call API
*/
export default class memberServices {

  static getAllMembers = () => {
    return getDocs(colRef);
  }

  static updateStatus = (param) => {
    const docRef = doc(db, 'members', param.memberId);
    return updateDoc(docRef, {
      status_id: parseInt(param.statusId),
      status: param.status 
    });
  }

  static signInByFireBase = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
}