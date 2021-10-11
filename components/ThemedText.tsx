import React from 'react';
import {Text, StyleProp, TextStyle, TextProps} from 'react-native';
import {useTheme} from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  styles?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const ThemedText = ({styles, children, ...props}: ThemedTextProps) => {
  const {currentTheme} = useTheme();

  return (
    <Text
      style={[
        {
          color: currentTheme.text,
          fontFamily: 'Montserrat',
        },
        styles,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
