alter table "public"."profiles" add column "github" text;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_github_key" UNIQUE ("github");

ALTER TABLE
  "public"."advent"
ADD
  CONSTRAINT "advent_username_fkey" FOREIGN KEY (username) REFERENCES public.profiles(github) NOT valid;

ALTER TABLE
  "public"."advent" validate CONSTRAINT "advent_username_fkey";
