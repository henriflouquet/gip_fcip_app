import React from 'react';
import { Image, Text, View } from 'react-native';

import Card from './ui/card.js';
import theme from '../theme';

const CardContact = ({ text, image, width = 20, onPress }) => {
  return (
    <Card onPress={onPress} minHeight={70} minWidth={70}>
      <View rowGap={theme.spaces.sm} alignItems="center">
        <Image source={image} style={{ width, height: 20 }} />
        <View>
          <Text
            style={{
              color: theme.colors.blue,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: theme.font.sizes.sm,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default CardContact;
