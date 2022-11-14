// TODO: Fix offsets

import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { 
  NativeSyntheticEvent,
  NativeScrollEvent, 
  ScrollView,
  View,
} from 'react-native';
import ScrollPickStyle from '../../styles/components/ScrollPickStyle';

interface ScrollPickProps {
  elements: Array<ReactNode>,
  selectedIdx: number,
  setSelectedIdx: Dispatch<SetStateAction<number>>
  offsetWidth: number,
}

const ScrollPick = ({ elements, selectedIdx, setSelectedIdx, offsetWidth }: ScrollPickProps) => {
  const offsets = new Array(elements.length);
  const startOffset = 0;
  const diffOffset = 120;
  const originalOffset = startOffset + diffOffset * 3;
  for ( let i = 0; i < offsets.length; i++) {
    offsets[i] = startOffset + diffOffset * i;
  }

  const entrySelections = (idx: number) => {
    const allComponents = new Array<ReactNode>(elements.length);
    for (let i = 0; i < elements.length; i++) {
      if (idx == i) {
        allComponents[i] = elements[i];
      } else {
        allComponents[i] = elements[i];
      }
    }
    return allComponents;
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
      <View style={ScrollPickStyle.buffer}></View>
      {entrySelections(selectedIdx)}
      <View style={ScrollPickStyle.buffer}></View>
    </ScrollView>
  );
};

export default ScrollPick;
