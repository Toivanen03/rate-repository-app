import React from 'react';
import useRepoId from '../hooks/useRepoId';
import useRepoReviews from '../hooks/useRepoReviews';
import useRepoUrl from '../hooks/useRepoUrl';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { Pressable, Linking, View, FlatList, StyleSheet } from 'react-native';
import { formStyle, reviewsStyle, buttonStyle } from '../theme';
import { format } from "date-fns";

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

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), "dd.MM.yyyy")
  return (
    <>
    <View style={reviewsStyle.ratingContainer}>
      <View style={reviewsStyle.ratingValueBorder}>
        <Text style={reviewsStyle.ratingValue}>{review.rating}</Text>
      </View>
      <View style={reviewsStyle.content}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text>{date}</Text>
        <Text style={reviewsStyle.text}>{review.text}</Text>
      </View>
    </View>
    </>
  );
};

const RepositoryPage = () => {
  const repoId = useRepoId();
  const { repositories, repoLoading, repoError } = useRepositories();
  const { url, urlLoading, urlError } = useRepoUrl(); 
  const { reviews, reviewsLoading, reviewsError } = useRepoReviews();

  if (repoLoading || reviewsLoading || urlLoading || !url || !reviews) {
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
