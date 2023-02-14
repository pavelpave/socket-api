// ! При окончании работы с сокетом или размонтировании компонента корой его использует обязательно закрыть соединение
class AbstractSocket {
  socket: WebSocket; // инстанс
  listeners: Map<any, any>; // список всех события для конкретного инстанса
  api: string; // домен
  qp: any; //  параметры (чат румы например)
  coonectionURI: string; //api + qp

  /**
   * Создаст инстанс
   * Подключит все события установленные через on
   * Обработтает дефолтные проблеммы в виде реконекта
   */
  activate = (): void => {
    this.socket.onopen = (e) => {
      if (this.listeners.has('open')) {
        this.listeners.get('open')(e);
      }
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== undefined) {
        if (this.listeners.has(data.type)) {
          this.listeners.get(data.type)(event.data);
        } else {
          console.warn('Тип события не определен!');
        }
      }
    };
    this.socket.onclose = (event) => {
      if (this.listeners.has('disconnect')) {
        this.listeners.get('disconnect')(event);
      }
      setTimeout(this.activate, 2000);
    };
    this.socket.onerror = (error) => {
      if (this.listeners.has('error')) {
        this.listeners.get('error')(error);
      }
    };
  };

  /**
   * установка событий
   * ? не запрещяется вешать дефолтные
   * @param event - название события ( будет использованно как ключ )
   * @param callback - метод который будет установлен по ключу
   */
  on = (event, callback): void => {
    if (this.listeners.has(event)) {
      this.listeners.delete(event);
      this.listeners.set(event, callback);
    } else {
      this.listeners.set(event, callback);
      console.log('this.listeners', this.listeners);
    }
  };

  /**
   * Удалит событие по ключу
   * @param eventName - название события ( будет использованно как ключ )
   */
  removeEventSocket = (eventName: string): void => {
    if (this.listeners.has(eventName)) {
      this.listeners.delete(eventName);
    }
  };

  /**
   * Необходимо для сигналов на бек
   * ! заранее обговорить ключи для сигналов ( или найти список )
   * @param key - текуший ключ === сигнал
   * @param signal - данные описывающие сигнал
   * @param data - остальные данные ( мержатся в строку с сигналами )
   */
  emit = (key = 'type', signal, data = {}): void => {
    this.socket.send(
      JSON.stringify({
        [key]: signal,
        ...data,
      })
    );
  };

  /**
   * инициализация 
   * @param api 
   * @param qp 
   * @returns WebSocket
   */
  init = (api: string, qp: string): WebSocket => {
    this.api = api;
    this.qp = qp;
    this.coonectionURI = `${api}${qp}`;
    this.socket = new WebSocket(this.coonectionURI);
    this.listeners = new Map();
    this.activate();
    return this.socket;
  };
}

export default AbstractSocket;
