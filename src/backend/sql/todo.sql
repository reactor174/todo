CREATE DATABASE IF NOT EXISTS `todo`;
USE `todo`;

CREATE TABLE IF NOT EXISTS `Todo` (
    `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `userName` varchar(32) NOT NULL,
    `eMail` varchar(32) NOT NULL,
    `text` text NOT NULL,
    `isCompleted` tinyint NOT NULL DEFAULT 0,
    `isModified` tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT 'Todos';

DELIMITER //
CREATE TRIGGER `checkTodoUpdated` BEFORE UPDATE ON `Todo`
    FOR EACH ROW BEGIN
        IF ( NEW.`text` <> OLD.`text` ) THEN
            SET NEW.`isModified` = 1;
        END IF;
    END//
DELIMITER ;
