# Как использовать Fetcher

Импортируем

```js
import {
  useInit,
  useSocketDefaultCallback,
  useSocketCustomEvent,
} from "@garpix/socket-api";
```

Используем

```
  const socketInstans = useInit(url, roomId)
  const socket = useSocketDefaultCallback(socketInstans, {
    open: () => {},
    connect: () => {},
    disconnect: () => {},
    error: () => {},
  })
  const socket = useSocketCustomEvent(socketInstans, "command-start", () => {})
```

## Версия

0.0.1 - idea
