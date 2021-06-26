CREATE DATABASE momandpop;

CREATE TABLE “Types” (
	“Store_ID” serial NOT NULL,
	“restaurant” serial NOT NULL,
	“clothing” serial NOT NULL,
	CONSTRAINT “Types_pk” PRIMARY KEY (“Store_ID”)
) WITH (
  OIDS=FALSE
);
CREATE TABLE “Restaurants” (
	“Eric’s” serial NOT NULL,
	“Miklos” serial NOT NULL,
	“Charlies” serial NOT NULL,
	CONSTRAINT “Restaurants_pk” PRIMARY KEY (“Eric’s”)
) WITH (
  OIDS=FALSE
);
CREATE TABLE “Clothing Stores” (
	“Moms” BINARY NOT NULL,
	“Pops” BINARY NOT NULL
) WITH (
  OIDS=FALSE
);
ALTER TABLE “Restaurants” ADD CONSTRAINT “Restaurants_fk0” FOREIGN KEY (“Eric’s”) REFERENCES “Types”(“restaurant”);
ALTER TABLE “Clothing Stores” ADD CONSTRAINT “Clothing Stores_fk0" FOREIGN KEY (“Moms”) REFERENCES “Types”(“clothing”);
