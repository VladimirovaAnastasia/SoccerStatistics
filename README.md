# SoccerStat
Сервис для просмотра спортивной статистики.


[Ссылка](https://VladimirovaAnastasia.github.io/SoccerStatisctics) на gh-pages.

В качестве публичного API для получения данных используется
https://www.football-data.org/.

Запуск приложения:
### `npm start`

Сборка приложения:
### `build start`


### Что сделано: 
- [x] Реализованы страницы [Список лиг](https://VladimirovaAnastasia.github.io/SoccerStatisctics/competitions), 
[Список команд лиги](https://VladimirovaAnastasia.github.io/SoccerStatisctics/competition/ELC),
[Календарь лиги](https://VladimirovaAnastasia.github.io/SoccerStatisctics/competition/ELC/matches), 
[Календарь команды](https://VladimirovaAnastasia.github.io/http://localhost:3001/SoccerStatisctics/competition/ELC/346);
- [x] На страницах календаря можно указать фильтр по дате (с, по);
- [x] На всех страницах можно найти сущность по текстовому поиску;
- [x] После обновления страницы данные (год, команда, поисковой запрос) сохраняются;
- [x] На всех страницах, кроме главной (со списком лиг), есть быть возможность выбрать год.
- [x] Для хранения ключей API использован .env;
- [x] Использованы eslint и prettier;
- [x] Реализована адаптивная версия;
- [x] Для хранения данных используется Redux (Redux Toolkit);
- [x] Настроен деплой на gh-pages.

