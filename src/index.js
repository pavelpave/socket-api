import React from "react";
import SocketCore from "./core";

const useInit = (url, roomId) => {
  const socket = SocketCore.init(url, roomId); 
  return socket;
};

const useSocketDefaultCallback = (socket, options) => {
  const { open, connect, disconnect, error } = options;
  socket.on("open", open);
  socket.on("connect", connect);
  socket.on("disconnect", disconnect);
  socket.on("error", error);
  return socket;
};

const useSocketCustomEvent = (socket, key, callback) => {
    socket.on(key, callback)
    return socket
};

export { useInit, useSocketDefaultCallback, useSocketCustomEvent };
