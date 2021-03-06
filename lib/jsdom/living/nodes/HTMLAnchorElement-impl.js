"use strict";
const { mixin } = require("../../utils");
const DOMTokenList = require("../generated/DOMTokenList");
const HTMLElementImpl = require("./HTMLElement-impl").implementation;
const HTMLHyperlinkElementUtilsImpl = require("./HTMLHyperlinkElementUtils-impl").implementation;

class HTMLAnchorElementImpl extends HTMLElementImpl {
  constructor(args, privateData) {
    super(args, privateData);

    this._htmlHyperlinkElementUtilsSetup();
  }

  get relList() {
    if (this._relList === undefined) {
      this._relList = DOMTokenList.createImpl([], {
        element: this,
        attributeLocalName: "rel"
      });
    }
    return this._relList;
  }

  get text() {
    return this.textContent;
  }
  set text(v) {
    this.textContent = v;
  }

  _attrModified(name) {
    if (name === "rel" && this._relList !== undefined) {
      this._relList.attrModified();
    }
  }
}

mixin(HTMLAnchorElementImpl.prototype, HTMLHyperlinkElementUtilsImpl.prototype);

module.exports = {
  implementation: HTMLAnchorElementImpl
};
