CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task_name" VARCHAR (250) NOT NULL,
	"task_note" VARCHAR (250) NOT NULL,
	"task_completed" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("task_name", "task_note")
VALUES ('Grocery Shop', 'eggs, bacon, milk, bagels'),
('Homework', 'read chapter 2 & take notes'),
('Pick-up', 'pick mom from airport'),
('Garbage', 'take out garbage');