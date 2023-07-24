import type { DocumentReference } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useAuth, useFirestore } from 'reactfire';

import { Collections } from './Collections';
import type { User } from './User';

export const useSignIn = () => {
  const auth = useAuth();

  const [baseSignIn, _, isLoading, error] = useSignInWithGithub(auth);
  const store = useFirestore();

  const signIn = useCallback(async () => {
    const data = await baseSignIn();
    if (!data) throw Error('Login Failed');

    const ref = doc(
      store,
      Collections.Users,
      data.user.uid,
    ) as DocumentReference<User | undefined>;
    const d = await getDoc(ref);

    if (!d.exists()) return setDoc(ref, { email: data.user.email });
  }, [baseSignIn, store]);

  const status = error ? 'error' : isLoading ? 'loading' : 'success';

  return { signIn, status };
};
