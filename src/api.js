export default class Api {
  static connection = null;

  static init() {
    Api.connection = new WebSocket('ws://st-chat.shas.tel');
    return Api.connection;
  }
}
