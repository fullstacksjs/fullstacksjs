CREATE trigger on_auth_user_created
  AFTER INSERT ON auth.users
  for each ROW EXECUTE PROCEDURE handle_new_user();
