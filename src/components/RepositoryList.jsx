import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text'
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const ItemSeparator = () => <View style={styles.separator} />;

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem {...item} onPress={() => navigate(`/${item.id}`)} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

    if (loading) {
    return <Text>Loading...</Text>;
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  };

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;