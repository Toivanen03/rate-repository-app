import { useQuery } from '@apollo/client';
import { REPO_REVIEWS } from '../graphql/queries';
import useRepoId from './useRepoId';

const useRepoReviews = (options) => {
    const repoId = useRepoId();
    const { loading: reviewsLoading, error: reviewsError, data, refetch, fetchMore, ...result } = useQuery(REPO_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: { repositoryId: repoId, ...options }
    });

    const handleFetchMore = () => {
        const canFetchMore = !reviewsLoading && data?.reviews?.pageInfo?.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.reviews.pageInfo.endCursor,
            ...options,
          },
        });
      }

    const reviews = data?.repository?.reviews?.edges.map(edge => edge.node);

    return { reviews, reviewsLoading, reviewsError, fetchMore: handleFetchMore, refetch, ...result };
};

export default useRepoReviews;