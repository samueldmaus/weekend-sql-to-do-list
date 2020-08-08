CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task_name" VARCHAR (250) NOT NULL,
	"task_note" VARCHAR (250) NOT NULL,
	"task_priority" VARCHAR (250) NOT NULL,
	"task_completed" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("task_name", "task_note", "task_priority")
VALUES ('Groceries', 'eggs, bacon, milk, bagels', 'Low'),
('Homework', 'read chapter 2 & take notes', 'High'),
('Pick-up', 'pick mom from airport', 'High'),
('Garbage', 'take out garbage', 'Medium');