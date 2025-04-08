import { TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import { formStyle, colors } from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useState } from 'react';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .min(5)
        .max(30)
        .required('Username is required'),
    pwd: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    pwdConf: yup
        .string()
        .oneOf([yup.ref('pwd'), null], "Passwords don't match")
        .required('Password confirmation is required')
  });

export const SignUpFormContainer = ({ onSubmit, errorMsg }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            pwd: '',
            pwdConf: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={formStyle}>
            <TextInput
                style={[
                    formStyle.inputField,
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
                    formStyle.inputField,
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

            <TextInput
                style={[
                    formStyle.inputField,
                    formik.errors.pwdConf && formik.touched.pwdConf && {
                        borderColor: colors.error,
                    },
                ]}
                secureTextEntry={true}
                placeholder='Confirm password:'
                value={formik.values.pwdConf}
                onChangeText={formik.handleChange('pwdConf')}
            />
            {formik.touched.pwdConf && formik.errors.pwdConf && (
                <Text color='error'>{formik.errors.pwdConf}</Text>
            )}
            
            <Text color='error'>{errorMsg}</Text>

            <Pressable onPress={formik.handleSubmit} style={formStyle.button}>
                <Text style={formStyle.button.text}>Log in</Text>
            </Pressable>
        </View>
    )
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        const username = data.name;
        const password = data.pwd;
        const confirmation = data.pwdConf;
        if (password === confirmation && typeof(password) === typeof(confirmation)) {
            try {
                const user = await signUp({ username, password });
                if (user) {
                    await signIn({ username, password });
                };
            } catch (error) {
                setErrorMsg(error.message);
            }
        }
    }
    return <SignUpFormContainer onSubmit={onSubmit} errorMsg={errorMsg} />;
};

export default SignUp;