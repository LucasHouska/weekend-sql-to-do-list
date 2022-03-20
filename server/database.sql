CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR(250) NOT NULL,
"is_it_complete" BOOLEAN DEFAULT FALSE,
"time_created" TIMESTAMP);

SELECT * FROM "tasks"
ORDER BY time_created;

INSERT INTO "tasks" ("task", "time_created")
    VALUES ('Do dishes', current_timestamp);
    
DELETE FROM "tasks"
WHERE "id" = 5;

UPDATE "tasks"
    SET "is_it_complete" = true
    WHERE "id" = 5;
    
UPDATE "tasks"
    SET "is_it_complete" = true
    WHERE "id" = 10;