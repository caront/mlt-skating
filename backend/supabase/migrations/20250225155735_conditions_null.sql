ALTER TABLE conditions ALTER COLUMN "open" DROP NOT NULL;
ALTER TABLE conditions ALTER COLUMN "open" SET DEFAULT null;

ALTER TABLE conditions ALTER COLUMN "cleared" DROP NOT NULL;
ALTER TABLE conditions ALTER COLUMN "cleared" SET DEFAULT null;

ALTER TABLE conditions ALTER COLUMN "condition" DROP NOT NULL;
ALTER TABLE conditions ALTER COLUMN "condition" SET DEFAULT null;

ALTER TABLE conditions ALTER COLUMN "watered" DROP NOT NULL;
ALTER TABLE conditions ALTER COLUMN "watered" SET DEFAULT null;

ALTER TABLE conditions ALTER COLUMN "resurfaced" DROP NOT NULL;
ALTER TABLE conditions ALTER COLUMN "resurfaced" SET DEFAULT null;

