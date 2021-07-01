CREATE DATABASE locals_only;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    pass_word text NOT NULL
);

-- CREATE TABLE Favorites(
-- 	favorites_id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
-- 	favorite_store VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE stores(
-- 	store_id INTEGER NOT NULL REFERENCES Favorites(favorites_id),
-- 	store_name VARCHAR(255) NOT NULL,
-- 	address VARCHAR(255) NOT NULL,
-- 	phone_number VARCHAR(255) NOT NULL

-- );
-- ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_name") REFERENCES ""("");
-- ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
-- ALTER TABLE "stores" ADD CONSTRAINT "stores_fk0" FOREIGN KEY ("store_name") REFERENCES "Favorites"("favorite_store");


-- INSERT INTO "users"("first_name", "last_name", "email_address", "pass_word") VALUES('charlie', 'malave', 'cm@gmail.com', 'jlfdsal') RETURNING "id", "first_name", "last_name", "email_address", "pass_word";