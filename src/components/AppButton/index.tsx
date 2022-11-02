import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/styles/Colors';
import TextStyles from '../../utils/styles/TextStyles';

interface AppButtonProps {
  onPress: (event: GestureResponderEvent) => void
  title: string
  isArrow?: boolean
  backgroundColor?: string
  textColor?: string
  width?: number
  height?: number
}

const AppButton = ({ 
  onPress,
  title, 
  isArrow,
  backgroundColor,
  textColor,
  width,
  height,
}: AppButtonProps) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.appButtonContainer, 
      { backgroundColor, width, height },
    ]}
  >
    <Text style={[
      styles.appButtonText, 
      { color: textColor },
    ]}>
      {title}
    </Text>
    {
      isArrow && <AntDesign name='caretright' size={25} color='white' />
    }
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.primary.normal,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appButtonText: {
    ...TextStyles.subHeading,
    color: 'white',
    alignSelf: 'center',
  },
});

export default AppButton;

// TODO: Fix arrow