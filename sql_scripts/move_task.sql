DROP PROCEDURE IF EXISTS move_up;
DROP PROCEDURE IF EXISTS move_down;

DELIMITER $$

CREATE PROCEDURE move_up (IN cur_id INT)
BEGIN

DECLARE top_id INT;

DECLARE cur_title VARCHAR(100);
DECLARE cur_desc TEXT;
DECLARE cur_image VARCHAR(100);
DECLARE cur_length FLOAT;

SET top_id = cur_id-1;

SELECT title INTO cur_title FROM tasks WHERE id=cur_id;
SELECT description INTO cur_desc FROM tasks WHERE id=cur_id;
SELECT image INTO cur_image FROM tasks WHERE id=cur_id;
SELECT length INTO cur_length FROM tasks WHERE id=cur_id;

DELETE FROM tasks WHERE id=cur_id;
UPDATE tasks SET id=cur_id WHERE id=top_id;
INSERT INTO tasks (id, title, description, image, length) VALUE (top_id, cur_title, cur_desc, cur_image, cur_length);

END $$

CREATE PROCEDURE move_down (IN cur_id INT)
BEGIN

DECLARE bottom_id INT;

DECLARE cur_title VARCHAR(100);
DECLARE cur_desc TEXT;
DECLARE cur_image VARCHAR(100);
DECLARE cur_length FLOAT;

SET bottom_id = cur_id+1;

SELECT title INTO cur_title FROM tasks WHERE id=cur_id;
SELECT description INTO cur_desc FROM tasks WHERE id=cur_id;
SELECT image INTO cur_image FROM tasks WHERE id=cur_id;
SELECT length INTO cur_length FROM tasks WHERE id=cur_id;

DELETE FROM tasks WHERE id=cur_id;
UPDATE tasks SET id=cur_id WHERE id=bottom_id;
INSERT INTO tasks (id, title, description, image, length) VALUE (bottom_id, cur_title, cur_desc, cur_image, cur_length);

END $$

DELIMITER ;


