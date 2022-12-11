import memberServices from "./memberServices";
import CommonActions from "../common/CommonActions";
export default class memberActions {
  static async getProducts () {
    try {
      const response = await memberServices.getAllProducts();
      console.log(response);
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

