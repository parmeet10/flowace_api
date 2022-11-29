CREATE TABLE
  `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    `email` varchar(128) NOT NULL,
    `password` varchar(64) NOT NULL,
    `active`  BOOL NOT NULL DEFAULT TRUE,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
  )
