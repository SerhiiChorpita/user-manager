CREATE DATABASE api;
use api;

CREATE TABLE `users` (
  `id`       int(11)     unsigned NOT NULL AUTO_INCREMENT,
  `name`     varchar(30) DEFAULT '',
  `email`    varchar(50) DEFAULT '',
  `password`     varchar(30) DEFAULT '',
  `created_at`    varchar(50) DEFAULT '',
   `updated_at`    varchar(50) DEFAULT 'not updated',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (name, email,password,created_at,updated_at) 
     VALUES ('Ivan', 'ii@gmail.com.com', 'qwerty123','09:00 08.11.2022', 'not updated'),
     ('Petro', 'pp@gmail.com.com', 'qwerty123','09:00 08.11.2022', 'not updated'),
     ('Pavlo', 'pv@gmail.com.com', 'qwerty123','09:00 08.11.2022', 'not updated');
