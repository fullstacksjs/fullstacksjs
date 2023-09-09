CREATE TABLE IF NOT EXISTS  "public"."records" (
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "best_record" numeric
);
ALTER TABLE "public"."records" OWNER TO "postgres";
ALTER TABLE ONLY "public"."records" 
	ADD CONSTRAINT "records_pkey" PRIMARY KEY ("user_id");
ALTER TABLE ONLY "public"."records"
	ADD CONSTRAINT "records_user_id_key" UNIQUE ("user_id");
ALTER TABLE ONLY "public"."records"
	ADD CONSTRAINT "records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;
CREATE POLICY "Users can insert their own record." ON "public"."records" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));
CREATE POLICY "Enable Read for the Authenticated User" ON "public"."records" FOR SELECT USING (true);  
CREATE POLICY "Users can update own record." ON "public"."records" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));
ALTER TABLE "public"."records" ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE "public"."records" TO "anon";
GRANT ALL ON TABLE "public"."records" TO "authenticated";
GRANT ALL ON TABLE "public"."records" TO "service_role";