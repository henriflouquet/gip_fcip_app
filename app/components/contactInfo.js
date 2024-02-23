import React from 'react';
import { Image, Text, View } from 'react-native';

import theme from '../theme';

const ContactInfo = ({ telMobile, email }) => {
  return (
    <>
      {telMobile && (
        <View
          flexDirection="row"
          columnGap={theme.spaces.md}
          alignItems="center"
        >
          <Image
            style={{ width: 13, height: 13 }}
            source={require('../assets/tel-gris.png')}
          />
          <Text>{telMobile}</Text>
        </View>
      )}
      {email && (
        <View
          flexDirection="row"
          columnGap={theme.spaces.md}
          alignItems="center"
        >
          <Image
            style={{ width: 13 * (500 / 369), height: 13 }}
            source={require('../assets/mail-gris.png')}
          />
          <Text>{email}</Text>
        </View>
      )}
    </>
  );
};

export default ContactInfo;
