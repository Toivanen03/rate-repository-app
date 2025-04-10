import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;