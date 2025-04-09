import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import { reviewsStyle } from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), "dd.MM.yyyy")
  return (
    <>
    <View style={reviewsStyle.ratingContainer}>
      <View style={reviewsStyle.ratingValueBorder}>
        <Text style={reviewsStyle.ratingValue}>{review.rating}</Text>
      </View>
      <View style={reviewsStyle.content}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text>{date}</Text>
        <Text style={reviewsStyle.text}>{review.text}</Text>
      </View>
    </View>
    </>
  );
};

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