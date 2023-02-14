import AbstractSocket from './core/socket';

/**
 * хук для создания инстанса сокета и последующей модификации
 * @param url - домен
 * @param qp  - параметры (чат румы например)
 * @returns AbstractSocket
 */
const useInit = (
  url: string,
  qp: string
): AbstractSocket => {
  const initSocket = new AbstractSocket();
  initSocket.init(url, qp);
  return initSocket;
};

/**
 * колектор событий, привязывает список событий к инстансу AbstractSocket и колбеков
 * @param socket - AbstractSocket
 * @param options - любой объект ( помним про дефолтные события которые хорошо логируются типо "open,close" и т.д)
 * @returns AbstractSocket
 */
const useSocketCollectCallbacks = (
  socket: AbstractSocket,
  options: any
): AbstractSocket => {
  Object.keys(options).forEach((key) =>
    socket.on(key, options[key])
  );
  return socket;
};

/**
 *
 * @param socket AbstractSocket
 * @param key - название события
 * @param callback  - обратный вызов по выполнении события
 * @returns AbstractSocket
 */
const useSocketAddCustomEvent = (
  socket: AbstractSocket,
  key: string,
  callback: (P: any) => void
): AbstractSocket => {
  socket.on(key, callback);
  return socket;
};

export {
  useInit,
  useSocketCollectCallbacks,
  useSocketAddCustomEvent,
};
