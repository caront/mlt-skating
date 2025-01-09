-- Create the "districts" table if it doesn't already exist
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    district_code TEXT UNIQUE NOT NULL,
    district_name TEXT NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create the "rinks" table with a foreign key to the "districts" table
CREATE TABLE IF NOT EXISTS rinks (
    id SERIAL PRIMARY KEY,
    district_id INT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT,
    rink_name TEXT NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE
);

-- Create an ENUM type for the condition field
DO $$ BEGIN
    CREATE TYPE CONDITION_ENUM AS ENUM ('Excellente', 'Good', 'BAD', 'N/A');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the "rink_conditions" table with a foreign key to the "rinks" table
CREATE TABLE IF NOT EXISTS rink_conditions (
    id SERIAL PRIMARY KEY,
    rink_id INT NOT NULL,
    open BOOLEAN NOT NULL DEFAULT FALSE,
    cleared BOOLEAN NOT NULL DEFAULT FALSE,
    watered BOOLEAN NOT NULL DEFAULT FALSE,
    resurfaced BOOLEAN NOT NULL DEFAULT FALSE,
    condition CONDITION_ENUM NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (rink_id) REFERENCES rinks(id) ON DELETE CASCADE
);
