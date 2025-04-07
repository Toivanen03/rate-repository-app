import React from 'react';
import { useParams } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Button, Linking, View } from 'react-native';
import { loginFormStyle } from '../theme';

const RepositoryPage = () => {
  const { repoId } = useParams();
  const { repositories, loading, error } = useRepositories();
  const { data } = useQuery(SINGLE_REPO, {
    variables: { repositoryId: repoId }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repo = repositories.edges.map(edge => edge.node).find(r => r.id === repoId);

  if (!repo) return <Text>Repository not found</Text>;

  return (
    <>
        <RepositoryItem {...repo} />
        <View style={loginFormStyle.button}>
            <Button title="GitHub" onPress={() => Linking.openURL(data.repository.url)} />
        </View>
    </>
  )
};

export default RepositoryPage;