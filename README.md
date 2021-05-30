<!-- # Как использовать Fetcher

Импортируем
```js
import { Fetcher } from '@garpix/fetcher';
```
В компонент который является странице необходимо добавить ```Fetcher``` и прокинуть все
```props``` из ```react-router-dom```.

```paramsKey``` отвечает за ключ в объекте ```match.params``` на который будет происходить обновление.

```jsx
<Fetcher {...props} paramsKey={'0'}>
  {(data, error) => {
    if(data === null && error !== null) return <ErrorPage error={error} />
    if(!data) return null;
    const { pageType, page } = data;
    const Page = PAGE_TYPES[pageType];
    return <Page {...page} />
  }}
</Fetcher>
```

Следуя документации настраиваем https://github.com/storeon/storeon

И добавляем

```js
import { page } from '@garpix/fetcher';
const storeonParams = [
    ...
    page,
]
```

# FetcherList

## Параметры компонента

`api`: эндпоинт куда фечер будет бегать за данными

- пример эндпоинта

```javascript
import BaseApi from '@garpix/base-api';

export default class ContentApi extends BaseApi {
  getCatalogData = async (params = {}) => {
    const res = await this.get('/catalog/product/', params);
    return res.data;
  };
}
```

## Пример использования

```jsx
<FetcherList api={contentApi.getCatalogData}>
  {(data) => {
    const {
      count,
      results = [],
      activePage,
      loadData,
      showMore,
      status,
      filterParams,
      deleteElement,
      updateElement,
      deleteElementByKey,
      updateElementByKey,
      isNext,
      isPrev,
    } = data;
    return (
      <>
        <AppliedFilters />
        <FiltersCatalog
          categories={categories}
          brands={brands}
          multy_choise_filters={multy_choise_filters}
        />
        <ProductGrid results={results} />
      </>
    );
  }}
</FetcherList>
```

## Параметры функции рендера

`count`: общее колличество элементов

`results`: множество данных описывающих основные сущности

`activePage`: текущяя активная страница пагинации

`loadData`: функция принимающяя (`page`, `filterParams`, `isConcat`)
Название параметра | Параметры
----------------|----------------------
page | обязательный параметр
filterParams | `{}`
isConcat | `false`

- применима в момент когда необходимо обновить `results` с применением некоторых фильтров

`showMore`: функция которая может подгрузить еще данных в `results`

`status`: текущий статус получения данных `loading`, `failed`, `loaded`

`filterParams`: текущие примененные фильтры

`deleteElement`: функция которая удаляет элемент по его индексу

- в качестве параметра принимает `index`

`deleteElementByKey`: функция которая удаляет элемент по его ключу

- в качестве параметра принимает `value`, `key`

`updateElementByKey`: функция которая обновляет элемент по его ключу

- в качестве параметра принимает `obj` , `value`, `key`

`isNext`: этот параметр говорит о том есть ли следующяя страница `bollean`

`isPrev`: этот параметр говорит о том есть ли предыдущая страница `bollean`

`otherData`: этот параметр содержит дополнительные данные с АПИ. По умолчанию `undefined`

`reload`: Запрашивает данные с текущими фильтрами -->

## Версия

0.0.1 - idea

