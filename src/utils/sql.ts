import postgres from "postgres"

export const sql = postgres(process.env.URI)

/*
-- create table
CREATE TABLE url_shortener (
  id UUID PRIMARY KEY default gen_random_uuid(),
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE
);
*/
