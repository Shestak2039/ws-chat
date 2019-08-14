export default class Api {
  static connection = null;

  static init() {
    this.connection = new WebSocket('ws://st-chat.shas.tel');
  }
}
