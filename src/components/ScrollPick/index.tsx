import React, { useState } from 'react';
import { 
  NativeSyntheticEvent,
  NativeScrollEvent, 
  GestureResponderEvent, 
  // StyleSheet, 
} from 'react-native';
import { ScrollView, View, Text } from 'react-native';

interface ScrollPickProps {
  onPress: (event: GestureResponderEvent) => void
}

const ScrollPick = ({ onPress }: ScrollPickProps) => {
  const offsets = new Array(9);
  const startOffset = 45;
  const diffOffset = 68;
  const originalOffset = startOffset + diffOffset * 3;
  for ( let i = 0; i < offsets.length; i++) {
    offsets[i] = startOffset + diffOffset * i;
  }

  const [selectedEntry, setSelectedEntry] = useState(1);

  const entrySelections = (selectedNumber: number) => {
    const allTextComponents = new Array(9);
    for (let i = 0; i < 9; i++) {
      if (selectedNumber == i + 1) {
        allTextComponents[i] = i + 1;
      } else {
        allTextComponents[i] = i + 1;
      }
    }
    return allTextComponents;
  };
  let moved = false;
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (originalOffset != e.nativeEvent.contentOffset.x) moved = true;
    if (moved == false) return;
    const suspectedSelect = 1 + ((e.nativeEvent.contentOffset.x - startOffset) / diffOffset);
    if ((e.nativeEvent.contentOffset.x - startOffset) % diffOffset == 0) {
      setSelectedEntry(suspectedSelect);
    }
  };
  
  return (
    <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      snapToOffsets={offsets}
      decelerationRate='fast'
      snapToAlignment={'start'}
      onScroll={handleScroll}
      snapToEnd={false}
      snapToStart={false}
      contentOffset={{ x: originalOffset, y: 0 }}
    >
      <View>
        <Text>
          {entrySelections(selectedEntry)}
        </Text>
      </View>
    </ScrollView>
  );
};

/*
const styles = StyleSheet.create({

});
*/

export default ScrollPick;
