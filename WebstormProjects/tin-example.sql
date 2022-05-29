-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Янв 28 2022 г., 19:42
-- Версия сервера: 8.0.27
-- Версия PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tin-example`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Klient`
--

CREATE TABLE `Klient` (
  `id_klient` int NOT NULL,
  `Imie` varchar(20) NOT NULL,
  `Nazwisko` varchar(20) NOT NULL,
  `Wiek` int NOT NULL,
  `Plec` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `Klient`
--

INSERT INTO `Klient` (`id_klient`, `Imie`, `Nazwisko`, `Wiek`, `Plec`) VALUES
(3, 'Anton', 'Solodkyi', 21, 'M'),
(46, 'PO', 'Zalupa', 12, 'M');

-- --------------------------------------------------------

--
-- Структура таблицы `Pracownik`
--

CREATE TABLE `Pracownik` (
  `id_pracownik` int NOT NULL,
  `imie` varchar(20) NOT NULL,
  `nazwisko` varchar(20) NOT NULL,
  `stawka` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `Pracownik`
--

INSERT INTO `Pracownik` (`id_pracownik`, `imie`, `nazwisko`, `stawka`) VALUES
(1, 'ASDSA', 'asd', 12),
(7, 'PO', 'Zalupa', 12);

-- --------------------------------------------------------

--
-- Структура таблицы `Sklep`
--

CREATE TABLE `Sklep` (
  `id_sklep` int NOT NULL,
  `Adresa` varchar(20) NOT NULL,
  `Data_otwarcia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `Sklep`
--

INSERT INTO `Sklep` (`id_sklep`, `Adresa`, `Data_otwarcia`) VALUES
(1, 'Grojecka 193', '2016-11-28'),
(7, 'Lopuszanska 22', '2021-12-16');

-- --------------------------------------------------------

--
-- Структура таблицы `sklep_klient`
--

CREATE TABLE `sklep_klient` (
  `id_sklep_klient` int NOT NULL,
  `id_sklep` int NOT NULL,
  `id_klient` int NOT NULL,
  `data_ostatniego_wizutu_klienta` date NOT NULL,
  `data_nastepnego_wizytu` date DEFAULT NULL,
  `straczona_summa` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `sklep_klient`
--

INSERT INTO `sklep_klient` (`id_sklep_klient`, `id_sklep`, `id_klient`, `data_ostatniego_wizutu_klienta`, `data_nastepnego_wizytu`, `straczona_summa`) VALUES
(1, 1, 3, '2016-10-21', '2016-10-03', 1212);

-- --------------------------------------------------------

--
-- Структура таблицы `sklep_pracownik`
--

CREATE TABLE `sklep_pracownik` (
  `id` int NOT NULL,
  `id_pracownik` int NOT NULL,
  `id_sklep` int NOT NULL,
  `data_zatrudnienia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `sklep_pracownik`
--

INSERT INTO `sklep_pracownik` (`id`, `id_pracownik`, `id_sklep`, `data_zatrudnienia`) VALUES
(20, 1, 1, '2016-10-08'),
(21, 1, 1, '2022-01-01');

-- --------------------------------------------------------

--
-- Структура таблицы `UserPass`
--

CREATE TABLE `UserPass` (
  `id` int NOT NULL,
  `email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `UserPass`
--

INSERT INTO `UserPass` (`id`, `email`, `password`, `isAdmin`) VALUES
(1, 'Admin', '$2a$08$4NjhRrPQMh4pZfUukBmkQOi2NXnQewT0fYk61r.Kv5cXrGuf4TgDm', 1),
(23, 'asd', '$2a$08$8nLcd/96RekFYIlIVHaRYOUTH.IYyk8so/yBLV0aHpAJevk6yzMH.', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Klient`
--
ALTER TABLE `Klient`
  ADD PRIMARY KEY (`id_klient`);

--
-- Индексы таблицы `Pracownik`
--
ALTER TABLE `Pracownik`
  ADD PRIMARY KEY (`id_pracownik`);

--
-- Индексы таблицы `Sklep`
--
ALTER TABLE `Sklep`
  ADD PRIMARY KEY (`id_sklep`);

--
-- Индексы таблицы `sklep_klient`
--
ALTER TABLE `sklep_klient`
  ADD PRIMARY KEY (`id_sklep_klient`),
  ADD KEY `sklep_klient_Klient` (`id_klient`),
  ADD KEY `sklep_klient_Sklep` (`id_sklep`);

--
-- Индексы таблицы `sklep_pracownik`
--
ALTER TABLE `sklep_pracownik`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sklep_pracownik_Pracownik` (`id_pracownik`),
  ADD KEY `sklep_pracownik_Sklep` (`id_sklep`);

--
-- Индексы таблицы `UserPass`
--
ALTER TABLE `UserPass`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Klient`
--
ALTER TABLE `Klient`
  MODIFY `id_klient` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `Pracownik`
--
ALTER TABLE `Pracownik`
  MODIFY `id_pracownik` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `Sklep`
--
ALTER TABLE `Sklep`
  MODIFY `id_sklep` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `sklep_klient`
--
ALTER TABLE `sklep_klient`
  MODIFY `id_sklep_klient` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `sklep_pracownik`
--
ALTER TABLE `sklep_pracownik`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `UserPass`
--
ALTER TABLE `UserPass`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `sklep_klient`
--
ALTER TABLE `sklep_klient`
  ADD CONSTRAINT `sklep_klient_Klient` FOREIGN KEY (`id_klient`) REFERENCES `Klient` (`id_klient`),
  ADD CONSTRAINT `sklep_klient_Sklep` FOREIGN KEY (`id_sklep`) REFERENCES `Sklep` (`id_sklep`);

--
-- Ограничения внешнего ключа таблицы `sklep_pracownik`
--
ALTER TABLE `sklep_pracownik`
  ADD CONSTRAINT `sklep_pracownik_Pracownik` FOREIGN KEY (`id_pracownik`) REFERENCES `Pracownik` (`id_pracownik`),
  ADD CONSTRAINT `sklep_pracownik_Sklep` FOREIGN KEY (`id_sklep`) REFERENCES `Sklep` (`id_sklep`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
