import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styles/Colors';
import TextStyles from '../../utils/styles/TextStyles';

export interface ILogEntry {
  value: number,
}

const LogEntry = ({ value }: ILogEntry) => {
  return (
    <View
      style={localStyles.overlayModal}
    > 
      <Text style={[TextStyles.title, { color: Colors.primary.vibrantGreen }]}>
        { value }
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  overlayModal: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    height: 91,
    borderRadius: 9,
    backgroundColor: Colors.secondary.white,
  },
});

export default LogEntry;