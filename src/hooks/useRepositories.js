import { useQuery } from '@apollo/client';
import { REPO_DETAILS } from '../graphql/queries';

const useRepositories = () => {
  const { loading: repoLoading, error: repoError, data, refetch } = useQuery(REPO_DETAILS,
    {fetchPolicy: 'cache-and-network'}
  );

  const repositories = data?.repositories;

  return { repositories, repoLoading, repoError, refetch };
};

export default useRepositories;