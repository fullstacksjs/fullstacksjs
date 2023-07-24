import { isNullOrEmptyArray } from '@fullstacksjs/toolbox';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { clientConfig } from '@/config/clientConfig';

const apps = getApps();
const firebaseApp = isNullOrEmptyArray(apps)
  ? initializeApp(clientConfig.firebase)
  : apps[0]!;

const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
