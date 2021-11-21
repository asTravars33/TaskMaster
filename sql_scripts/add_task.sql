DROP PROCEDURE IF EXISTS add_task;

DELIMITER $$

CREATE PROCEDURE add_task(IN t_title VARCHAR(100), IN t_desc TEXT, IN t_image VARCHAR(100), IN t_length FLOAT)
BEGIN

DECLARE nextId INT DEFAULT 0;

SELECT COUNT(*) INTO nextId FROM tasks;
INSERT INTO debug(msg) VALUE (nextId);

INSERT INTO debug(msg) VALUE (CONCAT(nextId, t_title, t_desc, t_image, t_length));

INSERT INTO tasks(id, title, description, image, length) VALUE (nextId, t_title, t_desc, t_image, t_length);

END $$

DELIMITER ;
