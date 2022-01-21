-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql:3306
-- Время создания: Янв 21 2022 г., 11:36
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
(16, 'pipkin', '$2a$08$AK7C/LoIuYE6EiSYMYXqq.RDV6vszS3xYbqigVrc4.xGtxoSoxPNC', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `UserPass`
--
ALTER TABLE `UserPass`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `UserPass`
--
ALTER TABLE `UserPass`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
