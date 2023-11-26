create table "Device" (
	"Id" serial PRIMARY KEY,
	"Cathegory" varchar(256),
	"CreationTime" timestamp,
	"Title" varchar(256),
	"Price" decimal,
	"Description" text,
	"Manufacturer" varchar(256),
	"CPU" varchar(256),
	"GPU" varchar(256),
	"Camera" varchar(256)
);

create table "Cloth" (
	"Id" serial PRIMARY KEY,
	"Cathegory" varchar(256),
	"CreationTime" timestamp,
	"Title" varchar(256),
	"Price" decimal,
	"Description" text,
	"Material" varchar(512),
	"Size" varchar(128),
	"Color" varchar(128)
);
