import stores from "../reducer";
import { isEmpty } from "lodash";

export default class Session {

  static getUserState() {
    return stores.getState().membersSlice;
  }

  static getUserData() {
    const userData = localStorage.getItem("_u") || "";
    return userData ? JSON.parse(window.atob(userData)) : {};
  }

  static loadSession() {
    let user = Session.getUserData();
    return isEmpty(user);
  }
}