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

create table 
`sport_schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sport_name` varchar(128) NOT NULL,
  `user_id` int NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `active` BOOL NOT NULL DEFAULT TRUE,
  PRIMARY KEY(`id`),
  FOREIGN KEY(`user_id`) REFERENCES `users`(`id`)
)