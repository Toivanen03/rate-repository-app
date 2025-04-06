import { View, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { appBarStyle } from '../theme';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { Pressable } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const { data, loading, error } = useQuery(ME);

  const authStorage = useAuthStorage();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  const logOut = async () => {
    await authStorage.removeAccessToken();
  }

  const LoggedIn = () => {
    if (data.me) {
      return (
        <Pressable style={{ marginRight: 10 }} onPress={logOut}>
          <Text fontSize="subheading" color="white">Log out</Text>
        </Pressable>
      )
    } else {
      return (
        <Link to="/login" style={{ marginRight: 10 }}>
          <Text fontSize="subheading" color="white">Sign in</Text>
        </Link>
      )
    }
  }

    return (
      <View style={appBarStyle.container}>
        <ScrollView horizontal contentContainerStyle={appBarStyle.contentContainer}>
            <Link to="/" style={{ marginRight: 20 }}>
                <Text style={appBarStyle.header}>{"Repo's"}</Text>
            </Link>
            <LoggedIn />
        </ScrollView>
      </View>
    );
};

export default AppBar;