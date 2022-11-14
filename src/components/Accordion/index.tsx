import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AccordionStyle from '../../styles/components/AccordionStyle';

interface AccordionProps {
  title: string
  children: React.ReactNode
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={AccordionStyle.outer}>
      <TouchableOpacity style={AccordionStyle.row} onPress={() => toggleExpand()}>
        <Text style={AccordionStyle.title}>{title}</Text>
        <AntDesign name={expanded ? 'minuscircleo' : 'pluscircleo'} size={30} color='white' />
      </TouchableOpacity>
      {
        expanded &&
        <View style={AccordionStyle.child}>
          {children}
        </View>
      }
    </View>
  );
};

export default Accordion;
