import { View, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import { reviewsStyle, colors } from '../theme';
import { format } from 'date-fns';
import { DELETE_REVIEW } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const ReviewItem = ({ review, logged, refetch }) => {
    const navigate = useNavigate();
    const [deleteReviewMutation] = useMutation(DELETE_REVIEW);

    const askDelete = (reviewId) => {
        const repoName = review.repository.fullName
        Alert.alert('Delete review', `Are you sure you want to delete your review for repository ${repoName}?`, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: () => deleteReview(reviewId)
            },
        ]);

        const deleteReview = async (reviewId) => {
            try {
                await deleteReviewMutation({
                    variables: {
                        deleteReviewId: reviewId,
                    }
                });
                refetch();
            } catch (error) {
                Alert.alert('ERROR:', error.message, [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ]);
                console.log(error.message)
            };
        };
    };

    const ReviewActionButtons = () => {
        if (logged) {
            const repoId = review.repository.id;
            const reviewId = review.id;

            return (
                <>
                    <View style={reviewsStyle.buttonContainer}>
                        <Pressable style={{ ...reviewsStyle.button, backgroundColor: colors.primary }} onPress={() => navigate(`/${repoId}`)}>
                            <Text fontSize="subheading" color="white">View repository</Text>
                        </Pressable>
                        <Pressable style={{ ...reviewsStyle.button, backgroundColor: colors.error }} onPress={() => askDelete(reviewId)}>
                            <Text fontSize="subheading" color="white">Delete review</Text>
                        </Pressable>
                    </View>
                </>
            )
        }
    }

    let displayName;
  
    if (review.repository) {
      displayName = review.repository.fullName;
    } else if (review.user) {
      displayName = review.user.username;
    }
  
    const date = format(new Date(review.createdAt), "dd.MM.yyyy");
  
    return (
        <>
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
            <ReviewActionButtons />
        </>
    );
  };
  

export default ReviewItem;