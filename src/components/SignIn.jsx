import { TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import { loginFormStyle, colors } from '../theme';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Username is required'),
    pwd: yup
      .string()
      .required('Invalid or missing password'),
  });

const LoginForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            pwd: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={loginFormStyle}>
            <TextInput
                style={[
                    loginFormStyle.inputField,
                    formik.errors.name && formik.touched.name && {
                        borderColor: colors.error,
                    },
                ]}
                placeholder='Username:'
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
            />
            {formik.touched.name && formik.errors.name && (
                <Text color='error'>{formik.errors.name}</Text>
            )}
            <TextInput
            style={[
                loginFormStyle.inputField,
                formik.errors.pwd && formik.touched.pwd && {
                    borderColor: colors.error,
                },
            ]}
            secureTextEntry={true}
            placeholder='Password:'
            value={formik.values.pwd}
            onChangeText={formik.handleChange('pwd')}
            />
            {formik.touched.pwd && formik.errors.pwd && (
            <Text color='error'>{formik.errors.pwd}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={loginFormStyle.button}>
                <Text style={loginFormStyle.button.text}>Log in</Text>
            </Pressable>
        </View>
    )
};

const SignIn = () => {
    const onSubmit = info => {
        console.log(info.name, info.pwd)
    }
    return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;