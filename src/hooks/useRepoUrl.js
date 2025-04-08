import { useQuery } from '@apollo/client';
import { REPO_URL } from '../graphql/queries';
import useRepoId from './useRepoId'

const useRepoUrl = () => {
    const repoId = useRepoId();
    const { loading: urlLoading, error: urlError, data } = useQuery(REPO_URL, {
        variables: { repositoryId: repoId }
    });

  const url = data?.repository?.url

  return { url, urlLoading, urlError };
};

export default useRepoUrl;