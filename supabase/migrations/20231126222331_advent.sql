CREATE TABLE "public"."advent" (
  "user_id" uuid,
  "created_at" timestamp with time zone not null default now(),
  "id" character varying NOT NULL,
  "year" numeric NOT NULL
);

GRANT ALL ON TABLE "public"."records" TO "anon";
GRANT ALL ON TABLE "public"."records" TO "authenticated";
GRANT ALL ON TABLE "public"."records" TO "service_role";

CREATE UNIQUE INDEX advent_pkey ON public.advent USING btree (id, year);

ALTER TABLE
  "public"."advent"
ADD
  CONSTRAINT "advent_pkey" PRIMARY KEY USING INDEX "advent_pkey";

ALTER TABLE
  "public"."advent"
ADD
  CONSTRAINT "advent_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) NOT valid;

ALTER TABLE
  "public"."advent" validate CONSTRAINT "advent_user_id_fkey";
