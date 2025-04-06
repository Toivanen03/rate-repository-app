import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const signIn = async ({ username, password }) => {
    const response = await mutate ({
        variables: {
            credentials: {
                username,
                password,
            },
        },
    });

    if (response) {
        return response.data.authenticate.accessToken;
    };
  };

  return [signIn, result];
};

export default useSignIn;