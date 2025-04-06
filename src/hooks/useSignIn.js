import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();
  const [token, setToken] = useState(undefined);

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate ({
          variables: {
              credentials: {
                  username,
                  password,
              },
          },
      });

      if (response) {
        const newToken = await authStorage.setAccessToken(response.data.authenticate.accessToken);
        setToken(newToken);
        return true;
      };
    } catch (error) {
      throw new Error('Invalid username or password!');
    }
  };

  useEffect(() => {
    if (token) {
      apolloClient.resetStore();
    }
  }, [token, apolloClient]);

  return [signIn, result];
};

export default useSignIn;