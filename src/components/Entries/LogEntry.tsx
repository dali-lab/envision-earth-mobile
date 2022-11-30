import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, TextStyles } from '../../styles';

export interface ILogEntry {
  date?: Date,
  value: number | string,
  plotName?: string,
}

const LogEntry = ({ date, value, plotName }: ILogEntry) => {
  return (
    <View
      style={localStyles.logContainer}
    >
      <Text style={[TextStyles.body, { color: Colors.primary.deepGreen }]}>
        { date && new Date(date).toLocaleDateString('en-US') }
      </Text>
      <Text style={[TextStyles.title, { color: Colors.primary.vibrantGreen }]}>
        { value }
      </Text>
      <Text style={[TextStyles.body, { color: Colors.primary.deepGreen }]}>
        { plotName }
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  logContainer: {
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 115,
    height: 110,
    borderRadius: 9,
    backgroundColor: Colors.secondary.white,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default LogEntry;
