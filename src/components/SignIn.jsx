import { TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import { loginFormStyle, colors } from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Username is required'),
    pwd: yup
      .string()
      .required('Missing password'),
  });

export const LoginFormContainer = ({ onSubmit, errorMsg }) => {
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
            )}<Text color='error'>{errorMsg}</Text>
            <Pressable onPress={formik.handleSubmit} style={loginFormStyle.button}>
                <Text style={loginFormStyle.button.text}>Log in</Text>
            </Pressable>
        </View>
    )
};

const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (info) => {
        const username = info.name;
        const password = info.pwd;
        try {
            const login = await signIn({ username, password });
            if (login) {
                navigate('/');
            };
          } catch (error) {
            setErrorMsg(error.message);
          }
    }
    return <LoginFormContainer onSubmit={onSubmit} errorMsg={errorMsg} />;
};

export default SignIn;