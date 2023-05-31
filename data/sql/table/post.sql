CREATE TABLE post
(
   `post_id`      INT NOT NULL AUTO_INCREMENT,
   `title`        VARCHAR(255) NOT NULL,
   `subtitle`     VARCHAR(255) NOT NULL,
   `image`        VARCHAR(255) NOT NULL,
   `imgModifier`  VARCHAR(255) NOT NULL,
   `author`       VARCHAR(255) NOT NULL,
   `authorImg`    VARCHAR(255) NOT NULL,
   `publish_date` VARCHAR(255) NOT NULL,
   `featured` TINYINT DEFAULT 0,
   PRIMARY KEY (`post_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci