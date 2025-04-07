import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

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
        await authStorage.setAccessToken(response.data.authenticate.accessToken);
        await apolloClient.resetStore();
        return true;
      };
    } catch (error) {
      throw new Error('Invalid username or password!');
    }
  };

  return [signIn, result];
};

export default useSignIn;