// Imported from old repo - major changes still needed

import React, { Dispatch, SetStateAction } from 'react';
import { 
  NativeSyntheticEvent,
  NativeScrollEvent, 
  StyleSheet, 
} from 'react-native';
import { ScrollView, View, Text } from 'react-native';

interface ScrollPickProps {
  elements: Array<number | string>,
  selectedIdx: number,
  setSelectedIdx: Dispatch<SetStateAction<number>>
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const ScrollPick = ({ elements, selectedIdx, setSelectedIdx }: ScrollPickProps) => {
  const offsets = new Array(elements.length);
  const startOffset = 45;
  const diffOffset = 68;
  const originalOffset = startOffset + diffOffset * 3;
  for ( let i = 0; i < offsets.length; i++) {
    offsets[i] = startOffset + diffOffset * i;
  }

  const entrySelections = (idx: number) => {
    const allTextComponents = new Array(elements.length);
    for (let i = 0; i < elements.length; i++) {
      if (idx == i) {
        allTextComponents[i] = <Text key={i} style={styles.selectedOption}>{elements[i]}</Text>;
      } else {
        allTextComponents[i] = <Text key={i} style={styles.unselectedOption}>{elements[i]}</Text>;
      }
    }
    return allTextComponents;
  };
  let moved = false;
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (originalOffset != e.nativeEvent.contentOffset.x) moved = true;
    if (moved == false) return;
    const suspectedSelect = ((e.nativeEvent.contentOffset.x - startOffset) / diffOffset);
    if ((e.nativeEvent.contentOffset.x - startOffset) % diffOffset == 0) {
      setSelectedIdx(suspectedSelect);
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
      scrollEventThrottle={16}
      snapToEnd={false}
      snapToStart={false}
      contentOffset={{ x: originalOffset, y: 0 }}
    >
      <View style={styles.buffer}></View>
      {entrySelections(selectedIdx)}
      <View style={styles.buffer}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  unselectedOption: {
    fontSize: 44,
    fontWeight: 'bold',
    margin: 20,
  },
  selectedOption: {
    fontSize: 54,
    fontWeight: 'bold',
    margin: 15,
  },
  buffer: {
    width: 200,
  },
});

export default ScrollPick;
