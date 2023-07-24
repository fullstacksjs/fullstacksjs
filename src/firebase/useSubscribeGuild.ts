import type { DocumentReference } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useUser } from 'reactfire';

import { Collections } from './Collections';
import type { User } from './User';

export const useSubscribeGuild = () => {
  const { data: user } = useUser();
  const store = useFirestore();

  const subscribe = async () => {
    if (!user) throw Error('User is not logged in');

    const ref = doc(
      store,
      Collections.Users,
      user.uid,
    ) as DocumentReference<User>;

    await setDoc(ref, { isGuildMember: true }, { merge: true });
  };

  return subscribe;
};
