import { assertNotNull } from '@fullstacksjs/toolbox';
import type { User } from '@supabase/auth-helpers-nextjs';
import { useEffect, useReducer } from 'react';

import { useSupabase } from './SupabaseProvider';

type AuthState =
  | { user: null; status: 'error' }
  | { user: null; status: 'loading' }
  | { user: User; status: 'success' };

type AuthAction =
  | { type: 'Error'; payload: { error: Error } }
  | { type: 'Loading'; payload: never }
  | { type: 'Success'; payload: { user: User } };

const reducer = (
  state: AuthState,
  { type, payload }: AuthAction,
): AuthState => {
  switch (type) {
    case 'Success':
      return { user: payload.user, status: 'success' };
    case 'Error':
      return { user: null, status: 'error' };
    case 'Loading':
      return { user: null, status: 'loading' };
  }

  return state;
};

const initialState: AuthState = {
  status: 'loading',
  user: null,
};

export const useUser = () => {
  const { supabase } = useSupabase();
  const [value, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        assertNotNull(res.data.user);
        dispatch({ type: 'Success', payload: { user: res.data.user } });
      })
      .catch((error) => {
        dispatch({ type: 'Error', payload: { error } });
      });
  });

  return value;
};
