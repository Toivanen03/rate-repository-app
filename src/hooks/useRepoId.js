import { useParams } from 'react-router-native';

const useRepoId = () => {
    const { repoId } = useParams();
    return repoId;
}

export default useRepoId;