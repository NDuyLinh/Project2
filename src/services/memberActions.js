import memberServices from "./memberServices";
import CommonActions from "../common/CommonActions";
import moment from "moment";
import { isNil } from "lodash";
export default class memberActions {
  static fetchProduct (products) {
    return products.reduce((total, product) => {
      if(isNil(product.color) || isNil(product.timestamp)) {
        return [...total];
      }
      const formatDate = moment(parseInt(product.timestamp) * 1000).format("DD-MM-YYYY");
      const findIndexProduct = total.findIndex(item => 
        item && 
        item.date === formatDate && 
        item.color === product.color
      );
      if(findIndexProduct >= 0) {
        total[findIndexProduct].value += 1;
        return [...total];
      }
      return [...total, {color: product.color, date: formatDate, value: 1}]
    },[]);
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
  
  static async registerEmail(email, password) {
    try {
      const response = await memberServices.registerEmailFirebase(email, password);
      console.log(response);
    } catch(err) {
      const message = err.message.split(":");
      return {
        errorMessage: message.length > 1 ? message[1] : message[0]
      }
    }
  }
  
}

