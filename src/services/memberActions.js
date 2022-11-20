import memberServices from "./memberServices";
import CommonActions from "../common/CommonActions";
export default class memberActions {
  static async getAllMember () {
    try {
      const response = await memberServices.getAllMembers();
      let members = [];
      if(response && response.docs) {
        response.docs.forEach((doc) => {
          members.push({ ...doc.data(), memberId: doc.id});
        })
      }
      return members;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateMemberStatus (param) {
    try {
      const response = await memberServices.updateStatus(param);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async signIn (email, password) {
    try {
      const response = await memberServices.signInByFireBase({email, password});
      return response;
    } catch (err) {
      return {
        error: CommonActions.getMessageError(err.message)
      }
    }
  }
}

