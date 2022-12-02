import { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, DropdownStyle, TextStyles } from '../../styles';

const PaddockDropdown = (props: {
  data: { label: string, data: string }[]
  plotId: string,
  setPlotId: (value: React.SetStateAction<string>) => void,
}) => {
  const [name, setName] = useState('');
  const [focus, setFocus] = useState(false);

  return <View style={DropdownStyle.container}>
    <Text
      style={{
        ...TextStyles.subHeading,
        color: Colors.primary.deepGreen,
        marginBottom: 10,
      }}
    >
      paddock
    </Text>
    <Dropdown
      style={[DropdownStyle.dropdown, focus && { borderColor: 'blue' }]}
      containerStyle={DropdownStyle.dropdownContainerStyle}
      placeholderStyle={DropdownStyle.dropdownPlaceholderStyle}
      selectedTextStyle={DropdownStyle.dropdownSelectedTextStyle}
      itemContainerStyle={DropdownStyle.dropdownItemContainerStyle}
      itemTextStyle={DropdownStyle.dropdownItemTextStyle}
      data={props.data}
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder={!focus ? name : '...'}
      value={props.plotId}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChange={item => {
        setName(item.label);
        props.setPlotId(item.data);
      }}
    />
  </View>;
};

export default PaddockDropdown;
