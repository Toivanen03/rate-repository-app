import Constants from 'expo-constants';
import { StyleSheet, Platform } from 'react-native';

export const colors = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  primary: '#0366d6',
  white: '#ffffff',
  error: '#d73a4a'
};

export const fonts = {
  fontsizes: {
    body: 14,
    subheading: 16,
    header: 24
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export const loginFormStyle = StyleSheet.create({
  padding: 10,
  margin: 10,
  inputField: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    color: colors.textPrimary
  },
  button: {
    padding: 10,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.white,
    text: {
      color: colors.white,
      fontSize: fonts.fontsizes.subheading,
      fontWeight: fonts.fontWeights.bold
    }
  }
});

export const appBarStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    padding: 16,
  },
  header: {
    fontSize: fonts.fontsizes.header,
    color: 'white',
    fontWeight: fonts.fontWeights.bold,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const data = {
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'gray',
    marginTop: 5,
  },
  language: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statCount: {
    fontWeight: 'bold',
  },
};