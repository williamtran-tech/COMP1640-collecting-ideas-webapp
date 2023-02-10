USE gre_ideas_db;

CREATE TABLE Category (
	id int auto_increment NOT NULL,
    category nvarchar(20) UNIQUE,
    primary key (id)
);
ALTER TABLE Category auto_increment = 0;

CREATE TABLE Topic(
	id int auto_increment NOT NULL,
    topic nvarchar(255) NOT NULL UNIQUE,
    closure_date datetime NOT NULL,
    final_closure_date datetime NOT NULL,
    primary key (id)
);
ALTER TABLE Topic auto_increment = 0;

CREATE TABLE Idea (
	id int AUTO_INCREMENT NOT NULL,
    idea varchar(255) NOT NULL,
    file_path nvarchar(260),
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category_id int NOT NULL,
    topic_id int NOT NULL,
    primary key (id),
    foreign key (category_id) references Category(id),
    foreign key (topic_id) references Topic(id)
);

ALTER TABLE Idea auto_increment = 0;