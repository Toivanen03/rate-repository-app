import { TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import { formStyle, colors } from '../theme';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const validationSchema = yup.object().shape({
    repoUser: yup
      .string()
      .required('Repository owner name is required'),
    repo: yup
      .string()
      .required('Repository name is required'),
    repoRating: yup
      .number()
      .required('Rating is required')
      .min(0, 'Negative rating is not allowed')
      .max(100, 'Maximum value for rating is 100')
      .integer('Rating must be an integer'),
    repoReview: yup
    .string()
    .optional()
  });

export const ReviewFormContainer = ({ onSubmit, errorMsg }) => {
    const formik = useFormik({
        initialValues: {
            repoUser: '',
            repo: '',
            repoRating: '',
            repoReview: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={formStyle}>
            <TextInput
                style={[
                    formStyle.inputField,
                    formik.errors.repoUser && formik.touched.repoUser && {
                        borderColor: colors.error,
                    },
                ]}
                placeholder='Repository owner name:'
                value={formik.values.repoUser}
                onChangeText={formik.handleChange('repoUser')}
            />

            {formik.touched.repoUser && formik.errors.repoUser && (
                <Text color='error'>{formik.errors.repoUser}</Text>
            )}

            <TextInput
                style={[
                    formStyle.inputField,
                    formik.errors.repo && formik.touched.repo && {
                        borderColor: colors.error,
                    },
                ]}
                placeholder='Repository name:'
                value={formik.values.repo}
                onChangeText={formik.handleChange('repo')}
            />

            {formik.touched.repo && formik.errors.repo && (
                <Text color='error'>{formik.errors.repo}</Text>
            )}

            <TextInput
                style={[
                    formStyle.inputField,
                    formik.errors.repoRating && formik.touched.repoRating && {
                        borderColor: colors.error,
                    },
                ]}
                placeholder='Rating between 0 and 100'
                value={formik.values.repoRating}
                onChangeText={formik.handleChange('repoRating')}
            />

            {formik.touched.repoRating && formik.errors.repoRating && (
                <Text color='error'>{formik.errors.repoRating}</Text>
            )}
            
            <TextInput
                style={[
                    formStyle.inputField,
                    formik.errors.repoReview && formik.touched.repoReview && {
                        borderColor: colors.error,
                    },
                ]}
                placeholder='Review'
                value={formik.values.repoReview}
                onChangeText={formik.handleChange('repoReview')}
                multiline={true}
            />

            {errorMsg ? <Text color='error'>{errorMsg.toString()}</Text> : null}
            
            <Pressable onPress={formik.handleSubmit} style={formStyle.button}>
                <Text style={formStyle.button.text}>Create a review</Text>
            </Pressable>
        </View>
    )
};

const ReviewForm = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [review] = useReview();

    const onSubmit = async (data) => {
        const ownerName = data.repoUser;
        const repositoryName = data.repo;
        const rating = data.repoRating;
        const text = data.repoReview;
        try {
            const id = await review({ ownerName, repositoryName, rating, text });
            if (id) {
                navigate(`/${id}`)
            };
          } catch (error) {
                setErrorMsg(error);
          }
    }
    return <ReviewFormContainer onSubmit={onSubmit} errorMsg={errorMsg} />;
};

export default ReviewForm;