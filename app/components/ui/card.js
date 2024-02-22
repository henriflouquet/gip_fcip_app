/* eslint-disable indent */
import React from 'react';
import { Platform, Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

import theme from '../../theme';
const { width, height } = Dimensions.get('window');
const SCard = styled.TouchableOpacity`
  ${({
    theme,
    bgColor,
    marginBottom,
    marginTop,
    paddingHorizontal,
    borderRadius,
    minHeight,
    paddingVertical,
    minWidth,
    alignItems,
    maxHeight,
  }) => css`
    background: ${bgColor};
    align-items: ${alignItems};
    justify-content: center;
    padding-vertical: ${paddingVertical}px;
    padding-horizontal: ${paddingHorizontal}px;
    border-radius: ${borderRadius}px;
    ${Platform.OS === 'android'
      ? // eslint-disable-next-line quotes
        "shadowcolor: '#E8E8E8'; elevation: 20;"
      : 'box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);'}
    margin-top: ${marginTop}px;
    margin-bottom: ${marginBottom}px;
    min-height: ${minHeight}px;
    min-width: ${minWidth}px;
    max-height: ${maxHeight ? `${maxHeight}px` : 'auto'};
  `}
`;

const Card = ({
  bgColor = theme.colors.white,
  onPress,
  marginTop = 0,
  alignItems = 'center',
  marginBottom = 0,
  paddingHorizontal = 0,
  children,
  borderRadius = theme.radius.lg,
  minHeight = width / 2 - theme.spaces.lg * 3,
  minWidth = width / 2 - theme.spaces.lg * 3,
  paddingVertical = 0,
  maxHeight,
  ...rest
}) => {
  return (
    <SCard
      paddingHorizontal={paddingHorizontal}
      bgColor={bgColor}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={onPress === undefined && true}
      marginBottom={marginBottom}
      marginTop={marginTop}
      borderRadius={borderRadius}
      minHeight={minHeight}
      paddingVertical={paddingVertical}
      minWidth={minWidth}
      alignItems={alignItems}
      maxHeight={maxHeight}
      {...rest}
    >
      {children}
    </SCard>
  );
};

export default Card;
