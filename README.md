# Chaos Organizer – курсовой проект AHJ модуля в Нетологии

## Общее описание
Проект представляет собой хранилище сообщений, в которое можно отравлять текст или файлы. Затем можно осуществлять поиск по тексту сообщений, можно просматривать файлы, можно устанавливать себе напоминания. Также можно писать сообщения виртуальному собеседнику (роботу) с помощью кнопки @.

## Структура
Проект состоит из серверной и клиентской части. Первая развёрнута на Heroku, вторая работает на GitHub pages. Задействованы следующие технические решения: WebSocket, Server Sent Events, Web Worker, Service Worker.

Серверная часть реализована на Koa и состоит из следующих групп модулей:

- services – инструменты для работы с данными сообщений, файлами и т.п.
- routers – маршруты, обрабатывающие запросы с клиента и использующие методы сервисов для подготовки ответов.

По условию задания не предполагается наличие нескольких пользователей.

Клиентская часть разнообразнее и состоит из следующих групп модулей:
- components – модули компонентов и их составляющих элементов. В данных модулях осуществляется визуальное представление компонентов и доступ к их интерактивным элементам и контейнерам для содержимого. Методы этих модулей позволяют управлять активностью и внешним видом компонентов.
- controllers – эти модули обеспечивают взаимодействие компонентов и приложения в целом с пользователем, а также его запуск и первоначальную конфигурацию.
- services – обеспечивают либо работу с данными на клиенте, либо доступ к серверу для их получения.
- workers – один модуль Web Worker для отслеживания состояния напоминаний.
- commons – общие для приложения функции и классы.
- стили распределены по отдельным файлам для удобства, но собраны в общем каталоге.

### Основополагающие элементы приложения:
- main-component – здесь создаются и упорядочиваются все элементы, подготавливаются все объекты и сервисы для передачи их в контроллеры и создаётся базовый контроллер – host-controller.
- именно в host-controller создаются все контроллеры компонентов и осуществляется запуск приложения. Возможность запуска в онлайн режиме отслеживается с помощью сервиса state-service. Отслеживание подключения осуществляется путём наблюдения за состоянием Web Socket. Повторных подключений Web Socket и SSE не осуществляется.

## Реализованные функции
(далее в тексте названия файлов, а не объектов классов)

### Обязательные функции
1.	Сохранение ссылок и сообщений. Реализовано в messages-controller. Отправка сообщений осуществляется с помощью компонента create-message. Если сообщение представляет собой команду роботу, то она обрабатывается через http-service по своему маршруту. Сообщение от робота публикуется временно, а затем удаляется из переписки. Если сообщение содержит файлы, то сначала через http-service отправляются они, а только потом при успешной отправке файлов через web-socket отправляется само сообщение. С сервера приходит зеркальное сообщение с данными файлов. Оно публикуется в элементе messages-page, которые является одним «листов» для отображения в составе chat-window. При публикации сообщения обрабатывается его текст и ссылки заменяются соответствующими элементами. Сообщения сохраняются в Local Storage.
2.	Ссылки, на которые можно нажать – реализовано, описано выше.
3.	Сохранение файлов происходит в два этапа. На первом этапе пользователь выбирает файлы с помощью кнопки «+» на компоненте create-message или посредствам перетаскивания. В обоих случаях создаётся виртуальный элемент input, а файлы помещаются в локальное хранилище на время до отправки сообщения – в file-cache-service и компоненте attached-files. Добавленные файлы отображаются под полем ввода сообщения. При отправке сообщения проверяется, есть ли добавленные файлы, и они отправляются при наличии. После отправки файлов на сервер через SSE происходит уведомление элемента content-browser об изменении набора файлов на сервере. Загруженные файлы можно просматривать через виджет «Файлы». Там же можно сортировать этот список.
4.	Скачивание файлов. Все файлы могут быть скачаны на ПК – из сообщений или из раскрытого виджета.
5.	Ленивая загрузка. При прокрутке вверх догружаются следующие 2 сообщения. Использован debounce (RxJS). Реализация в messages-controller.
### Дополнительные функции
1. Поиск. Реализован через запросы к соответствующим сервисам на сервере по http. Задействованы: компонент search, контроллер search-controller и http-service.
2. Синхронизация – при загрузке страница получает с сервера последнее имеющееся состояние. Получение новых сообщений происходит через Web Socket, а уведомлений об изменении в файлах по SSE.
3. Напоминания реализованы с помощью компонента notification-widget, контроллера notification-controller и http-service. На сервере осуществляется только хранение актуальных напоминаний. Для отслеживания времени напоминаний используется Web Worker – он один в приложении. Его запуск и остановка происходят по получению сообщений от контроллера.
4. Команды роботу обрабатываются при отправке сообщений – см. выше. Для подготовки ответа используются соответствующие запросы по http. Для этой функции используется только http.
5. Просмотр по категориям реализован в content-browser.
    Благодаря разделению размещений серверной и клиентской части приложение может запускаться полноценно, без сервера или полностью без доступа к интернету – это реализовано за счёт отслеживания состояния и использования service worker.
    Упрощённый дизайном и примитивный UI/UX пришлось выбрать вследствие ограниченного ресурса времени на выполнение проекта.
    
(!) платформа Heroku отключает соединение через 55 секунд – из-за ограничения на Timeout.

[![Build status](https://ci.appveyor.com/api/projects/status/mlplmjt05vur7riy?svg=true)](https://ci.appveyor.com/project/Alexey57575/ahj-diploma-client)

