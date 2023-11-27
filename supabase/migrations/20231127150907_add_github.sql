alter table "public"."profiles" add column "github" text;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_github_key" UNIQUE ("github");

ALTER TABLE
  "public"."advent"
ADD
  CONSTRAINT "advent_username_fkey" FOREIGN KEY (username) REFERENCES public.profiles(github) NOT valid;

ALTER TABLE
  "public"."advent" validate CONSTRAINT "advent_username_fkey";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, github)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'user_name');
  return new;
end;
$$;
