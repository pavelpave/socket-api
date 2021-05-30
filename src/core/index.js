import BaseApiForSocket from './socket';

class SocketApi extends BaseApiForSocket {
  constructor(BASE_URI_FOR_SOCKET) {
    super(BASE_URI_FOR_SOCKET);
  }

  init = (hash_id = '', api) => {
    this.init( BASE_URI_FOR_SOCKET, api, hash_id);
  };
  
  emitData = (event = 'connect', data, key) => {
    this.emit(event, data, key);
  };
}

export default SocketApi;