import React from "react";
import { capitalize } from "lodash";
import { ADMIN } from "./Foundation";

export default class CommonActions {
  
  static lazyWithPreload(pathComponent) {
    const component = React.lazy(pathComponent);
    component.preload = pathComponent;
    return component;
  }

  static getMessageError(message) {
    return message && message
      .trim()  
      .split('_')
      .map(mess => capitalize(mess))
      .join(" ");
  }

  static isAdmin(gmail) {
    return gmail.split("@")[0] === ADMIN;
  }
}
