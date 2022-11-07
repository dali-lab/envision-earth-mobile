import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/styles/Colors';
import TextStyles from '../../utils/styles/TextStyles';

export interface ILogEntry {
  value: string,
}

const PaddockEntry = ({ value }: ILogEntry) => {
  return (
    <View
      style={localStyles.paddockContainer}
    > 
      <Text style={[TextStyles.body, { color: Colors.primary.deepGreen }]}>
        { value }
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  paddockContainer: {
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 100,
    borderRadius: 9,
    backgroundColor: Colors.secondary.white,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default PaddockEntry;