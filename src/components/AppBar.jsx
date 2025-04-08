import { View, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { appBarStyle } from '../theme';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const AppBar = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const SignInButton = () => {
    if (data?.me) {
      return (
        <>
          <Link to="/reviewform" style={appBarStyle.button}>
            <Text fontSize="subheading" color="white">Create a review</Text>
          </Link>
          <Pressable style={appBarStyle.button} onPress={logOut}>
            <Text fontSize="subheading" color="white">Log out</Text>
          </Pressable>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" style={appBarStyle.button}>
            <Text fontSize="subheading" color="white">Sign in</Text>
          </Link>
          <Link to="/signup" style={appBarStyle.button}>
            <Text fontSize="subheading" color="white">Sign up</Text>
          </Link>
        </>
      );
    }
  };

  return (
    <View style={appBarStyle.container}>
      <ScrollView horizontal contentContainerStyle={appBarStyle.contentContainer}>
        <Link to="/" style={{ marginRight: 20 }}>
          <Text style={appBarStyle.header}>{"Repo's"}</Text>
        </Link>
        <SignInButton />
      </ScrollView>
    </View>
  );
};

export default AppBar;