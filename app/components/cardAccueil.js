import React from 'react';
import { Image, Text, View } from 'react-native';

import Card from './ui/card.js';
import theme from '../theme.js';

const CardAccueil = ({ text, image, width = 70, onPress }) => {
  return (
    <Card onPress={onPress}>
      <View rowGap={theme.spaces.sm}>
        <Image source={image} style={{ width, height: 70 }} />
        <View>
          <Text
            style={{
              color: theme.colors.blue,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default CardAccueil;
