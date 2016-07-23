CREATE table if not exists blog(
id int auto_increment primary key,
pagename varchar(255) not null,
author varchar(255) not null,
image varchar(255) not null,
name varchar(255) not null,
title varchar(255) not null,
uniqueTag varchar(255) unique not null,
topics varchar(255) not null,
content text not null
)ENGINE=INNODB;