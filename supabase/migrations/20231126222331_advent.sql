CREATE TABLE "public"."advent" (
  "created_at" timestamp with time zone not null default now(),
  "id" character varying NOT NULL,
  "year" numeric NOT NULL,
  "name" text,
  "username" text
);

GRANT ALL ON TABLE "public"."records" TO "anon";
GRANT ALL ON TABLE "public"."records" TO "authenticated";
GRANT ALL ON TABLE "public"."records" TO "service_role";

CREATE UNIQUE INDEX advent_pkey ON public.advent USING btree (id, year);

ALTER TABLE
  "public"."advent"
ADD
  CONSTRAINT "advent_pkey" PRIMARY KEY USING INDEX "advent_pkey";
