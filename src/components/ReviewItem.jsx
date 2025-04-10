import { View } from 'react-native';
import Text from './Text';
import { reviewsStyle } from '../theme';
import { format } from 'date-fns';

const ReviewItem = ({ review }) => {
    let displayName;
  
    if (review.repository) {
      displayName = review.repository.fullName;
    } else if (review.user) {
      displayName = review.user.username;
    }
  
    const date = format(new Date(review.createdAt), "dd.MM.yyyy");
  
    return (
      <View style={reviewsStyle.ratingContainer}>
        <View style={reviewsStyle.ratingValueBorder}>
          <Text style={reviewsStyle.ratingValue}>{review.rating}</Text>
        </View>
        <View style={reviewsStyle.content}>
          <Text fontWeight="bold">{displayName}</Text>
          <Text>{date}</Text>
          <Text style={reviewsStyle.text}>{review.text}</Text>
        </View>
      </View>
    );
  };
  

export default ReviewItem;