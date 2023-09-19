CREATE TABLE IF NOT EXISTS  "public"."records" (
  "id" uuid primary key DEFAULT uuid_generate_v4(),
  "user_id" uuid not null,
  "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
  "duration" numeric,
  "mistakes" numeric DEFAULT 0
);

ALTER TABLE "public"."records" OWNER TO "postgres";
ALTER TABLE ONLY "public"."records"
  ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

CREATE POLICY "Users can insert their own record." ON "public"."records" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Enable Read for the Authenticated User" ON "public"."records" FOR SELECT USING (true);
CREATE POLICY "Users can update own record." ON "public"."records" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));
ALTER TABLE "public"."records" ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE "public"."records" TO "anon";
GRANT ALL ON TABLE "public"."records" TO "authenticated";
GRANT ALL ON TABLE "public"."records" TO "service_role";

CREATE OR REPLACE FUNCTION get_best_time(p_user_id uuid)
RETURNS TABLE(user_id uuid, duration numeric) AS $$
BEGIN
    RETURN QUERY
    SELECT
        records.user_id as user_id,
        MIN(records.duration) as duration
    FROM
        records
    WHERE
        records.user_id = p_user_id AND records.mistakes = 0
    GROUP BY
        records.user_id;
END;
$$ LANGUAGE plpgsql;
