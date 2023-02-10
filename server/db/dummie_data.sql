use gre_ideas_db;

insert into category (category) VALUES
("Category 1"), ("Category 2"), ("Category 3");

insert into topic (topic, closure_date, final_closure_date) VALUES 
("Topic 1", '2019-04-10 23:50:40', '2019-05-10 23:50:40'),
("Topic 2", '2019-05-10 23:50:40', '2019-06-10 23:50:40'),
("Topic 3", '2019-06-10 23:50:40', '2019-07-10 23:50:40');

insert into idea (idea, category_id, topic_id) VALUE
("Idea 1", 1, 1),
("Idea 2", 1, 2),
("Idea 3", 2, 2),
("Idea 4", 3, 3);