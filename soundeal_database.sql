create database soundeal_database;
use soundeal_database;

create table users (
id integer PRIMARY KEY AUTO_INCREMENT,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL,
username varchar(40) NOT NULL,
password varchar(255) NOT NULL,
email varchar(255) NOT NULL,
artist_image varchar(1024),
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) Engine = 'InnoDB';

create table albums (
upc bigint PRIMARY KEY,
title varchar(100) NOT NULL,
user_id integer NOT NULL,
album_cover varchar(1024) NOT NULL,
tracks_number integer NOT NULL DEFAULT 0,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX new_user_id (user_id),
FOREIGN KEY (user_id) REFERENCES users (id) on update cascade on delete cascade) Engine = 'InnoDB';

create table tracks (
isrc varchar(12) PRIMARY KEY,
title varchar(100) NOT NULL,
album_id bigint NOT NULL,
author varchar(40) NOT NULL,
type varchar(20) NOT NULL,
genre varchar(30) NOT NULL,
language varchar(20) NOT NULL,
audio_file varchar(1024) NOT NULL,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX new_album_id (album_id),
FOREIGN KEY (album_id) REFERENCES albums (upc) on update cascade on delete cascade) Engine = 'InnoDB';

create table services (
name varchar(20) PRIMARY KEY,
logo varchar(255) NOT NULL,
details varchar(1024),
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) Engine = 'InnoDB';

create table favorite_services (
id integer PRIMARY KEY AUTO_INCREMENT,
user_id integer,
service_name varchar(20),
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX new_user_id(user_id),
INDEX new_service_name(service_name),
FOREIGN KEY(user_id) REFERENCES users (id) on update cascade on delete cascade,
FOREIGN KEY(service_name) REFERENCES services (name) on update cascade on delete cascade) Engine = 'InnoDB';

create table distributions (
id integer PRIMARY KEY AUTO_INCREMENT,
album_id bigint NOT NULL,
service_name varchar(20),
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX new_album_id(album_id),
INDEX new_service_name(service_name),
FOREIGN KEY(album_id) REFERENCES albums(upc) on update cascade on delete cascade,
FOREIGN KEY(service_name) REFERENCES services(name) on update cascade on delete cascade) Engine = 'InnoDB';

DELIMITER //
create trigger add_track
after insert on tracks
for each row
begin
if (new.album_id is not null)
then 
update albums set tracks_number = tracks_number + 1 where upc = new.album_id;
end if;
end //

create trigger delete_track
after delete on tracks
for each row
begin
if (old.album_id is not null)
then 
update albums set tracks_number = tracks_number - 1 where upc = old.album_id;
end if;
end //
DELIMITER ;


insert into services (name, logo, details) values ('Spotify', 'images/spotify.png', 'La piattaforma dominante nel business dello streaming musicale mondiale.');

insert into services (name, logo, details) values ('iTunes', 'images/itunes.png', 'Il servizio di punta nel mercato dei download digitali.');

insert into services (name, logo, details) values ('Amazon', 'images/amazon_music.png', 'Il principale rivenditore online al mondo, che offre anche un servizio di streaming musicale agli utenti Prime.');

insert into services (name, logo, details) values ('Deezer', 'images/deezer.png', 'Un importante servizio di streaming multimediale che, mensilmente, vanta circa 14 milioni di utenti.');

insert into services (name, logo, details) values ('Pandora', 'images/pandora.png', 'Una piattaforma che si pone come principale obiettivo quello di connettere artisti e fan in qualsiasi contesto e situazione.');

insert into services (name, logo, details) values ('TikTok', 'images/tiktok.png', 'Il social del momento. Consenti a milioni di utenti di realizzare video virali utilizzando la tua musica.');

insert into services (name, logo, details) values ('Instagram', 'images/instagram.png', 'Uno dei social maggiormente utilizzati al mondo. Selezionalo per rendere i tuoi brani disponibili sulle Instagram Stories.');

insert into services (name, logo, details) values ('Tencent', 'images/tencent.png', 'La principale piattaforma di intrattenimento musicale online della Cina.');

insert into services (name, logo, details) values ('YouTube', 'images/youtube.png', 'Con YouTube Music gli ascoltatori possono riprodurre i tuoi brani e accedere a tutti i video che i tuoi fan hanno creato utilizzando la tua musica.');

insert into services (name, logo, details) values ('NetEase', 'images/netease.png', 'Un promettente servizio musicale disponibile in Cina, con oltre 600 milioni di utenti registrati.');

insert into services (name, logo, details) values ('Yandex', 'images/yandex.png', 'Una famosissima piattaforma multimediale della Russia, che consente di riprodurre brani russi e stranieri.');

insert into services (name, logo, details) values ('Xiami Music', 'images/xiami.png', 'Il principale sito web musicale per completezza della Cina.');

insert into services (name, logo, details) values ('Resso', 'images/resso.png', 'Una promettente app di streaming musicale indirizzata alla scoperta della musica e alla promozione dell''artista.');

insert into services (name, logo, details) values ('KKBox', 'images/kkbox.png', 'Il principale player musicale in Taiwan, Hong Kong, Giappone, Singapore e Malesia, con oltre 10 milioni di utenti.');

insert into services (name, logo, details) values ('Napster', 'images/napster.png', 'Un''eccezionale piattaforma multimediale che consente di riprodurre e scaricare, per l''accesso offline, milioni di brani.');

insert into services (name, logo, details) values ('Saavn', 'images/saavn.png', 'Il principale fornitore di musica in streaming in India.');

insert into services (name, logo, details) values ('Boomplay', 'images/boomplay.png', 'Un''app che si propone di costruire un grande e affidabile ecosistema di musica digitale per artisti e creatori di contenuti in Africa.');

insert into services (name, logo, details) values ('Claro musica', 'images/claro_musica.png', 'La principale piattaforma musicale in Sud America, America centrale e Messico.');

insert into services (name, logo, details) values ('Anghami', 'images/anghami.png', 'Il servizio di streaming musicale di punta del Medio Oriente e del Nord Africa.');

insert into users (id, first_name, last_name, username, password, email, artist_image) values (1, 'Francesco', 'Castiglione', 'Francesco Castiglione', '$2y$10$BPyj4MMW0/U6C5jJoc/FwOQDn72NPKh/XCoSXS/GU74OXZXEZEDji', 'uni399647@studium.unict.it', 'user_images/60aae47316d726.47393411.jpg');

insert into favorite_services (user_id, service_name) values (1, 'Instagram');

insert into favorite_services (user_id, service_name) values (1, 'Spotify');

insert into favorite_services (user_id, service_name) values (1, 'TikTok');

insert into favorite_services (user_id, service_name) values (1, 'YouTube');

insert into albums (upc, title, user_id, album_cover) values (121812007526, 'Covers by Francesco', 1, 'covers/60ab04a298dbd8.47425560.jpg');

insert into albums (upc, title, user_id, album_cover) values (124181528500, 'Night Trip', 1, 'covers/60ab04acdd08f5.25761829.gif');

insert into albums (upc, title, user_id, album_cover) values (490106658468, 'Darkness', 1, 'covers/60ab04c382c4b3.91147150.jpg');

insert into albums (upc, title, user_id, album_cover) values (509844130093, 'Coming Soon', 1, 'covers/60ab0cd13d17a9.35740564.jpg');

insert into albums (upc, title, user_id, album_cover) values (536943127275, 'Black Rainbow', 1, 'covers/60ab056e239041.89440423.jpg');

insert into albums (upc, title, user_id, album_cover) values (699651717947, 'Winter Saxophone', 1, 'covers/60ab053614ba20.85678360.jpg');

insert into albums (upc, title, user_id, album_cover) values (960302777414, 'Old Holborn', 1, 'covers/60ab0bdc9b3a91.84629657.jpg');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab060e06', 'Iris - Cover', 121812007526, 'The Goo Goo Dolls', 'Cover', 'Alternative Rock', 'strumentale', 'tracks/60ab060e007f1Iris - Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab06d044', 'Black Rainbow', 536943127275, 'Francesco Castiglione', 'Brano originale', 'Progressive Rock', 'strumentale', 'tracks/60ab06d0440edBlack Rainbow.mp3');

 insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab073291', 'Do I Wanna Know? - Cover', 121812007526, 'Arctic Monkeys', 'Cover', 'Rock', 'en', 'tracks/60ab073291522Do I Wanna Know - Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab078117', 'Hotel California - Cover', 121812007526, 'Eagles', 'Cover', 'Rock', 'en', 'tracks/60ab078117e16Hotel California - Solo Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab081784', 'Believer - Cover', 121812007526, 'Imagine Dragons', 'Cover', 'Punk Rock', 'strumentale', 'tracks/60ab081784b76Believer - Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab087183', 'Everybody''s Changing - Cover', 121812007526, 'Keane', 'Cover', 'Elettronica', 'strumentale', 'tracks/60ab0871838f1Everybody''s Changing - Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab0899ed', 'Shallow - Cover', 121812007526, 'Lady Gaga', 'Cover', 'Glam Rock', 'strumentale', 'tracks/60ab0899ed261Shallow - Cover.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab08e81a', 'Prestigious Noise', 124181528500, 'Francesco Castiglione', 'Brano originale', 'Lo-Fi', 'strumentale', 'tracks/60ab08e815780Prestigious Noise.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab091381', 'New Planet', 124181528500, 'Francesco Castiglione', 'Brano originale', 'Elettronica', 'strumentale', 'tracks/60ab091381d4fNew Planet.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab0afdc9', 'Darkness', 490106658468, 'Francesco Castiglione', 'Brano originale', 'Progressive Rock', 'strumentale', 'tracks/60ab0afdc9b9eValkyries.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab0b5e5b', 'Winter Saxophone', 699651717947, 'Francesco Castiglione', 'Brano originale', 'Lo-Fi', 'strumentale', 'tracks/60ab0b5e5b5d5Winter Saxophone.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab0c1300', 'Old Holborn', 960302777414, 'Francesco Castiglione', 'Brano originale', 'Progressive Rock', 'strumentale', 'tracks/60ab0c1300077Old Holborn.mp3');

insert into tracks (isrc, title, album_id, author, type, genre, language, audio_file) values ('IT60ab0c5762', 'Use Your Illusion', 124181528500, 'Francesco Castiglione', 'Brano originale', 'Elettronica', 'strumentale', 'tracks/60ab0c57625d4Use Your Illusion.mp3');
