import { Text as NativeText, StyleSheet } from 'react-native';
import { fonts, colors } from '../theme'

const styles = StyleSheet.create({
  text: {
    color: colors.textPrimary,
    fontSize: fonts.fontsizes.body,
    fontFamily: fonts.fonts.main,
    fontWeight: fonts.fontWeights.normal,
  },
  colorTextSecondary: {
    color: colors.textSecondary,
  },
  colorPrimary: {
    color: colors.primary,
  },
  colorWhite: {
    color: colors.white,
  },
  colorError: {
    color: colors.error,
  },
  fontSizeSubheading: {
    fontSize: fonts.fontsizes.subheading,
  },
  fontWeightBold: {
    fontWeight: fonts.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;