import { convertType } from './helpers';

export default class Message {
  constructor(text, expectsResponse, sentDataType, responseDataType) {
    this.text = String(text);
    this.expectsResponse = Boolean(expectsResponse);
    this.responseText = `${this.text}-response`;
    this.sentDataType = String(sentDataType);
    this.responseDataType = String(responseDataType);
  }

  //get text
  getText(prefix) {
    return `${prefix}-${this.text}`;
  }

  getTextFromParent() {
    return this.getText('CSDT');
  }

  getTextFromChild(prefix) {
    return this.getText(prefix);
  }

  //get response text
  getResponseText(prefix) {
    return `${prefix}-${this.responseText}`;
  }

  getResponseTextFromParent() {
    return this.getResponseText('CSDT');
  }

  getResponseTextFromChild(prefix) {
    return this.getResponseText(prefix);
  }

  //convert
  convertSent(data) {
    return convertType(data, this.sentDataType);
  }

  convertResponse(data) {
    return convertType(data, this.responseDataType);
  }
}
