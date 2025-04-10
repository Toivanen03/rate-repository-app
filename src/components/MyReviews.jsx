import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { FlatList, StyleSheet, View } from 'react-native';
import { noReviewsStyle } from '../theme';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  const logged = Boolean(data?.me);

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  if (reviews.length !== 0) {
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} logged={logged} refetch={refetch} />}
        keyExtractor={(item) => item.id}
      />
    );
  } else {
    return (
      <View style={noReviewsStyle}>
        <Text style={noReviewsStyle.font}>You have not reviewed any repositories!</Text>
      </View>
    )
  }
};

export default MyReviews;