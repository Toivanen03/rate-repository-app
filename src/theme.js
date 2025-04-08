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
    header: 24,
    content: 15
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

export const formStyle = StyleSheet.create({
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
    borderRadius: 5,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
  },
  button: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 5,
    marginRight: 15,
    fontSize: fonts.fontsizes.subheading,
    fontWeight: fonts.fontWeights.bold,
    padding: 4
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

export const buttonStyle = {
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fonts.fontsizes.subheading,
    fontWeight: fonts.fontWeights.bold,
  },
}

export const reviewsStyle = {
  ratingValueBorder: {
    borderColor: colors.primary,
    borderWidth: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingValue: {
    color: colors.primary,
    fontWeight: fonts.fontWeights.bold,
    fontSize: fonts.fontsizes.subheading
  },
  ratingContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  content: {
    marginLeft: '3%',
    flex: 1
  },
  text: {
    flexShrink: 1,
    overflow: 'hidden',
  }
}