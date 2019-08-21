export default class Api {
  static connection = null;

  static init() {
    Api.connection = new WebSocket('wss://wssproxy.herokuapp.com/');
    return Api.connection;
  }
}
