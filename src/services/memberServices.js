import { db, colRef } from './firebaseConfig';
import { doc, getDocs, updateDoc } from 'firebase/firestore';

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
}