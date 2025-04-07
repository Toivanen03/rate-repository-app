import { View, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { appBarStyle } from '../theme';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const SignInButton = () => {
    if (data?.me) {
      console.log(data.me)
      return (
        <Pressable style={{ marginRight: 10 }} onPress={logOut}>
          <Text fontSize="subheading" color="white">Log out</Text>
        </Pressable>
      );
    } else {
      console.log(data.me)
      return (
        <Link to="/login" style={{ marginRight: 10 }}>
          <Text fontSize="subheading" color="white">Sign in</Text>
        </Link>
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