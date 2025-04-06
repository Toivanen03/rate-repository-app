import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  };

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(
        `${this.namespace}:token`,
      );
      return token ?? '';
    } catch (error) {
      console.error('Invalid or missing token: ', error);
    }
  };

  async setAccessToken(accessToken) {
    try {
      return await AsyncStorage.setItem(
        `${this.namespace}:token`,
        accessToken);
    } catch (error) {
      console.error('Saving token failed: ', error)
    }
  };

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (error) {
      console.error('Error removing token: ', error);
    }
  };
};

export default AuthStorage;