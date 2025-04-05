import { useQuery } from '@apollo/client';
import { REPO_DETAILS } from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data, refetch } = useQuery(REPO_DETAILS, {fetchPolicy: 'cache-and-network'});

  const repositories = data?.repositories;

  return { repositories, loading, error, refetch };
};

export default useRepositories;