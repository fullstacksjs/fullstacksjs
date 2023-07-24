'use client';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  AuthProvider,
  FirebaseAppProvider as BaseFirebaseAppProvide,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire';

import { clientConfig } from '@/config/clientConfig';

interface Props {
  children: React.ReactNode;
}

const FirebaseStoreProvider = ({ children }: Props): React.JSX.Element => {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);
  const auth = getAuth(app);
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
};

const FirebaseAppProvider = ({ children }: Props) => (
  <BaseFirebaseAppProvide firebaseConfig={clientConfig.firebase}>
    {children}
  </BaseFirebaseAppProvide>
);

export const FirebaseProvider = ({ children }: Props) => (
  <FirebaseAppProvider>
    <FirebaseStoreProvider>{children}</FirebaseStoreProvider>
  </FirebaseAppProvider>
);
