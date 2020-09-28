DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


create table users (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

create table if not exists posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);

ALTER TABLE users
ALTER COLUMN password type text;