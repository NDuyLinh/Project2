import React from "react";

export default class CommonActions {
  
  static lazyWithPreload(pathComponent) {
    const component = React.lazy(pathComponent);
    component.preload = pathComponent;
    return component;
  }
}
