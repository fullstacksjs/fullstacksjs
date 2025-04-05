-- Table: public.game
CREATE TABLE public.game (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Table: public.answer
CREATE TABLE public.answer (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    answer_id bigint,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    game_id bigint,
    question_id bigint,
    is_correct boolean
);

ALTER TABLE "public"."answer" ADD CONSTRAINT "answer_game_id_fkey" FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
ALTER TABLE "public"."answer" validate constraint "answer_game_id_fkey";

GRANT DELETE ON TABLE "public"."answer" TO "anon";
GRANT INSERT ON TABLE "public"."answer" TO "anon";
GRANT REFERENCES ON TABLE "public"."answer" TO "anon";
GRANT SELECT ON TABLE "public"."answer" TO "anon";
GRANT TRIGGER ON TABLE "public"."answer" TO "anon";
GRANT TRUNCATE ON TABLE "public"."answer" TO "anon";
GRANT UPDATE ON TABLE "public"."answer" TO "anon";

GRANT DELETE ON TABLE "public"."answer" TO "authenticated";
GRANT INSERT ON TABLE "public"."answer" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."answer" TO "authenticated";
GRANT SELECT ON TABLE "public"."answer" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."answer" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."answer" TO "authenticated";
GRANT UPDATE ON TABLE "public"."answer" TO "authenticated";

GRANT DELETE ON TABLE "public"."answer" TO "service_role";
GRANT INSERT ON TABLE "public"."answer" TO "service_role";
GRANT REFERENCES ON TABLE "public"."answer" TO "service_role";
GRANT SELECT ON TABLE "public"."answer" TO "service_role";
GRANT TRIGGER ON TABLE "public"."answer" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."answer" TO "service_role";
GRANT UPDATE ON TABLE "public"."answer" TO "service_role";

GRANT DELETE ON TABLE "public"."game" TO "anon";
GRANT INSERT ON TABLE "public"."game" TO "anon";
GRANT REFERENCES ON TABLE "public"."game" TO "anon";
GRANT SELECT ON TABLE "public"."game" TO "anon";
GRANT TRIGGER ON TABLE "public"."game" TO "anon";
GRANT TRUNCATE ON TABLE "public"."game" TO "anon";
GRANT UPDATE ON TABLE "public"."game" TO "anon";

GRANT DELETE ON TABLE "public"."game" TO "authenticated";
GRANT INSERT ON TABLE "public"."game" TO "authenticated";
GRANT REFERENCES ON TABLE "public"."game" TO "authenticated";
GRANT SELECT ON TABLE "public"."game" TO "authenticated";
GRANT TRIGGER ON TABLE "public"."game" TO "authenticated";
GRANT TRUNCATE ON TABLE "public"."game" TO "authenticated";
GRANT UPDATE ON TABLE "public"."game" TO "authenticated";

GRANT DELETE ON TABLE "public"."game" TO "service_role";
GRANT INSERT ON TABLE "public"."game" TO "service_role";
GRANT REFERENCES ON TABLE "public"."game" TO "service_role";
GRANT SELECT ON TABLE "public"."game" TO "service_role";
GRANT TRIGGER ON TABLE "public"."game" TO "service_role";
GRANT TRUNCATE ON TABLE "public"."game" TO "service_role";
GRANT UPDATE ON TABLE "public"."game" TO "service_role";



