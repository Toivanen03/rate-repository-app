import { useQuery } from '@apollo/client';
import { REPO_DETAILS, FILTERED_REPOS, SEARCH_REPOS } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, query, options = {}) => {
  let fetchQuery;
  let variables;

  if (query && query.trim() !== '') {
    fetchQuery = SEARCH_REPOS;
    variables = { searchKeyword: query, ...options };
  } else if (orderBy && orderDirection) {
    fetchQuery = FILTERED_REPOS;
    variables = { orderBy, orderDirection, ...options };
  } else {
    fetchQuery = REPO_DETAILS;
    variables = { ...options };
  }

  const { loading: repoLoading, error: repoError, data, refetch, fetchMore, ...result } = useQuery(fetchQuery, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !repoLoading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data?.repositories;

  return { repositories, fetchMore: handleFetchMore, ...result, repoLoading, repoError, refetch };
};

export default useRepositories;