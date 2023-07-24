import type { DocumentReference } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import type { ObservableStatus } from 'reactfire';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';

import { Collections } from './Collections';
import type { User } from './User';

export const useCurrentUser = (): ObservableStatus<User | undefined> => {
  const { data } = useUser();
  const store = useFirestore();

  const ref = doc(
    store,
    Collections.Users,
    data?.uid ?? 'wrong',
  ) as DocumentReference<User>;

  return useFirestoreDocData<User>(ref);
};
