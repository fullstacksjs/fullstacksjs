create table "public"."advent" (
  "user_id" uuid not null,
  "created_at" timestamp with time zone not null default now(),
  "id" character varying,
  "year" numeric not null
);

alter table
  "public"."advent" enable row level security;

CREATE UNIQUE INDEX advent_pkey ON public.advent USING btree (user_id, year);

alter table
  "public"."advent"
add
  constraint "advent_pkey" PRIMARY KEY using index "advent_pkey";

alter table
  "public"."advent"
add
  constraint "advent_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table
  "public"."advent" validate constraint "advent_user_id_fkey";
