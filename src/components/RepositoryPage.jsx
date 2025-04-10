import React from 'react';
import useRepoId from '../hooks/useRepoId';
import useRepoReviews from '../hooks/useRepoReviews';
import useRepoUrl from '../hooks/useRepoUrl';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { Pressable, Linking, View, FlatList, StyleSheet } from 'react-native';
import { formStyle, buttonStyle } from '../theme';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository, githubUrl }) => {
  return (
    <>
      <RepositoryItem {...repository} />
      <View style={formStyle.button}>
        <Pressable onPress={() => Linking.openURL(githubUrl)} style={buttonStyle.button}>
          <Text style={buttonStyle.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </>
  );
};

const RepositoryPage = () => {
  const repoId = useRepoId();
  const { repositories, repoLoading, repoError } = useRepositories();
  const { url, urlLoading, urlError } = useRepoUrl(); 
  const { reviews, reviewsLoading, reviewsError } = useRepoReviews();

  if (repoLoading || reviewsLoading || urlLoading) {
    return <Text>Loading...</Text>;
  }

  if (repoError || reviewsError || urlError) {
    return <Text>Error: {repoError?.message ?? reviewsError?.message ?? urlError?.message}</Text>;
  }

  const repository = repositories.edges.map(edge => edge.node).find(r => r.id === repoId);

  if (!repository) return <Text>Repository not found</Text>;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} githubUrl={url} />}
    />
  );
};

export default RepositoryPage;
