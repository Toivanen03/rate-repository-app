import { useQuery } from '@apollo/client';
import { REPO_REVIEWS } from '../graphql/queries';
import useRepoId from './useRepoId';

const useRepoReviews = () => {
    const repoId = useRepoId();
    const { loading: reviewsLoading, error: reviewsError, data } = useQuery(REPO_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: repoId }
    });

    const reviews = data?.repository?.reviews?.edges.map(edge => edge.node);

    return { reviews, reviewsLoading, reviewsError };
};

export default useRepoReviews;