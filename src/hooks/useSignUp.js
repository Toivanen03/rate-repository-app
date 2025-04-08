import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const useSignUp = () => {
    const navigate = useNavigate();
    const [mutate, result] = useMutation(CREATE_USER);

    const createUser = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    user: {
                        username,
                        password
                    },
                },
            });

            if (data?.createUser?.id) {
                navigate('/');
                return true;
            }

        } catch (error) {
            if (error.graphQLErrors?.length) {
                const messages = error.graphQLErrors.map(e => e.message).join('\n');
                throw new Error(messages);
              } else {
                throw new Error(`Adding user failed: ', ${error.message}`);
              }
        }
    };
  
    return [createUser, result];
};

export default useSignUp;