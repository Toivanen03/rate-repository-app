import { View, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { appBarStyle } from '../theme';
import Text from './Text';

const AppBar = () => {
    return (
      <View style={appBarStyle.container}>
        <ScrollView horizontal contentContainerStyle={appBarStyle.contentContainer}>
            <Link to="/" style={{ marginRight: 20 }}>
                <Text style={appBarStyle.header}>{"Repo's"}</Text>
            </Link>
            <Link to="/login" style={{ marginRight: 10 }}>
                <Text fontSize="subheading" color="white">Sign in</Text>
            </Link>
        </ScrollView>
      </View>
    );
};

export default AppBar;