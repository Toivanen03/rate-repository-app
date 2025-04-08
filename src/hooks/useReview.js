import { CREATE_REVIEW } from "../graphql/queries";
import { useMutation } from '@apollo/client';

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const createReview = async ({ ownerName, repositoryName, rating, text }) => {
        try {
            const { data } = await mutate({
                variables: {
                review: {
                    ownerName,
                    repositoryName,
                    rating: Number(rating),
                    text
                    },
                },
            });

            if (data?.createReview?.repositoryId) {
                const id = data.createReview.repositoryId;
                return id;
            }

        } catch (error) {
            if (error.graphQLErrors?.length) {
                const messages = error.graphQLErrors.map(e => e.message).join('\n');
                throw new Error(messages);
              } else {
                throw new Error(`Adding review failed: ', ${error.message}`);
              }
        }
    };
  
    return [createReview, result];
}

export default useReview;