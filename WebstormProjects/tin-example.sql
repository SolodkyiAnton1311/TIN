-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Янв 21 2022 г., 11:07
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
(3, 'Anton', 'Solodkyi', 21, 'M');

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
(7, 'Lopuszanska 22', '2021-12-16'),
(14, 'Grojecka 194', '2016-12-08');

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
(1, 1, 3, '2016-12-09', '2016-11-25', 1212);

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
(1, 'Admin', '$2a$08$AK7C/LoIuYE6EiSYMYXqq.RDV6vszS3xYbqigVrc4.xGtxoSoxPNC', 1),
(16, 'pipkin', '$2a$08$AK7C/LoIuYE6EiSYMYXqq.RDV6vszS3xYbqigVrc4.xGtxoSoxPNC', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Klient`
--
ALTER TABLE `Klient`
  ADD PRIMARY KEY (`id_klient`);

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
  MODIFY `id_klient` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `Sklep`
--
ALTER TABLE `Sklep`
  MODIFY `id_sklep` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `sklep_klient`
--
ALTER TABLE `sklep_klient`
  MODIFY `id_sklep_klient` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `UserPass`
--
ALTER TABLE `UserPass`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `sklep_klient`
--
ALTER TABLE `sklep_klient`
  ADD CONSTRAINT `sklep_klient_Klient` FOREIGN KEY (`id_klient`) REFERENCES `Klient` (`id_klient`),
  ADD CONSTRAINT `sklep_klient_Sklep` FOREIGN KEY (`id_sklep`) REFERENCES `Sklep` (`id_sklep`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
