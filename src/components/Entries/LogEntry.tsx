import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, TextStyles } from '../../styles';

export interface ILogEntry {
  value: number | string,
}

const LogEntry = ({ value }: ILogEntry) => {
  return (
    <View
      style={localStyles.logContainer}
    >
      <Text style={[TextStyles.title, { color: Colors.primary.vibrantGreen }]}>
        {value}
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  logContainer: {
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 94,
    height: 91,
    borderRadius: 9,
    backgroundColor: Colors.secondary.white,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default LogEntry;
