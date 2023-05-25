import { createAuthClient } from '../libs/auth';

const login = async () => {
  const client = await createAuthClient();

  try {
    await client.loginWithPopup();
  } catch {
    // Oops!
  }
};

const LoginButton = (): JSX.Element => {
  return <button className="bg-accent-0 text-dark-0" onClick={login}>Log in</button>;
};

export default LoginButton;
