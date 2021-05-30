class SocketBase {
  activate = () => {
    this.socket.onopen = (e) => {
      if (this.listeners["open"]) {
        this.listeners["open"]();
      }
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.command)
        if (this.listeners[data.command]) {
          this.listeners[data.command](event.data);
        } else {
          console.warn("Тип события не определен!");
        }
    };
    this.socket.onclose = (event) => {
      if (this.listeners["disconnect"]) {
        this.listeners["disconnect"](event);
      }
      setTimeout(this.activate, 2000);
    };
    this.socket.onerror = (error) => {
      if (this.listeners["error"]) {
        this.listeners["error"](error);
      }
    };
  };

  on = (event, callback) => {
    this.listeners[event] = callback;
  };

  removeEventSocket = (eventName) => {
    delete this.listeners[eventName];
  };

  emit = (key = "type", event, data = {}) => {
    this.socket.send(
      JSON.stringify({
        [key]: event,
        ...data,
      })
    );
    return data;
  };

  init = (api, roomId) => {
    this.api = api;
    this.roomId = roomId;
    this.coonectionURI = `${this.api}${this.roomId}`;
    this.socket = new WebSocket(this.coonectionURI);
    this.listeners = {};
    this.activate();
    return this.socket;
  };
}

export default SocketBase;
