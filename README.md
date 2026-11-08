# Burger House

React, Vite, JavaScript, React Router, GSAP, Lucide React и обычный CSS.

## Запуск

```sh
npm ci
npm run dev
```

`npm run lint` — ESLint; `npm run build` — сборка в `dist`; `npm run preview` — просмотр сборки. При публикации настройте возврат `index.html` для маршрутов приложения.

## Структура

```text
public/                     Иконка вкладки
src/
  app/                      App и маршрутизация
  assets/
    images/
      backgrounds/          Фоны секций
      products/             Бургеры, картофель и напитки
      offers/               Изображения акций
    videos/                 Видео главного экрана
  components/
    layout/                 Header, Footer, MainLayout
    sections/               Hero, Offers, Contacts
    ui/                     Logo, IconButton, FeatureItem, Motion
  features/
    cart/
      components/           Окно корзины и стили
      model/                Контекст, CartProvider и useCart
    menu/
      components/           Карточка товара
      data/                 Каталог товаров
  hooks/                    Общая плавная прокрутка
  pages/                    Home, Menu, Offers, Contacts, NotFound
  styles/                   Общие стили
  utils/                    Преобразование прогресса видео в секунды
  main.jsx                  Точка входа
```

Код, используемый одной секцией, хранится рядом с ней: например, `Hero/hooks/useScrollVideo.js`. Стили Logo и IconButton расположены рядом с компонентами; состояние корзины находится в `features/cart`.

## Где менять данные

- `src/features/menu/data/products.js` — товары, цены, изображения и размеры фотографий.
- `src/assets/videos/bg-video.mp4` — видеозапись Hero, подключена в `HeroVideo.jsx`.
- `src/components/sections/Contacts/Contacts.jsx` — контакты и социальные сети.
- `src/app/router.jsx` — маршруты `/`, `/menu`, `/offers`, `/contacts` и страница 404.
- `src/styles/global.css` — цвета, базовые стили и разделители.

## Поведение и ограничения

Беззвучное видео управляется прокруткой. После последнего кадра меню поднимается поверх Hero. Карточки категорий появляются поочерёдно; акции сменяются при прокрутке.

Корзина поддерживает добавление, изменение количества, удаление и подсчёт суммы. Она хранится в памяти и очищается при перезагрузке. Список товаров прокручивается отдельно от итоговой суммы. После закрытия модального окна фокус возвращается кнопке корзины.

Оформление, оплата и отправка заказов на сервер не подключены. Телефон, адрес, расписание и социальные ссылки ожидают заполнения. Раздела доставки и поиска в навбаре нет. Three.js не используется.

После реорганизации проверяются ESLint, production-сборка, рендеринг страниц и целостность импортов. Визуальная проверка в браузере в этой среде недоступна.
