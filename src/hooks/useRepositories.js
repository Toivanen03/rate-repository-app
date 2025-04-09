import { useQuery } from '@apollo/client';
import { REPO_DETAILS, FILTERED_REPOS, SEARCH_REPOS } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, query) => {
  let fetchQuery;
  let variables;

  if (query && query.trim() !== '') {
    fetchQuery = SEARCH_REPOS;
    variables = { searchKeyword: query };
  } else if (orderBy && orderDirection) {
    fetchQuery = FILTERED_REPOS;
    variables = { orderBy, orderDirection };
  } else {
    fetchQuery = REPO_DETAILS;
    variables = {};
  }

  const { loading: repoLoading, error: repoError, data, refetch } = useQuery(fetchQuery, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repositories = data?.repositories;

  return { repositories, repoLoading, repoError, refetch };
};

export default useRepositories;