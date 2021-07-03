CREATE DATABASE locals_only;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    pass_word text NOT NULL
);

CREATE TABLE favorite_places (
    id SERIAL PRIMARY KEY,
    place_id text NOT NULL,
    store_name text NOT NULL,
    exact_address text NOT NULL,
    price_level integer,
    rating double precision
);

