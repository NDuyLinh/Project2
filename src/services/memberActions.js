import memberServices from "./memberServices";

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
}

