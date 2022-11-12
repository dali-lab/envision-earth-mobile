import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownStyle } from '../../styles';

const PaddockSelector = (props: {
  data?: any,
  placeholder: string,
  value: string,
  focus: boolean,
  onFocus: () => void,
  onBlur: () => void,
  onChange: (item: any) => void,
}) => {
  return <Dropdown
    style={[DropdownStyle.dropdown, props.focus && { borderColor: 'blue' }]}
    containerStyle={DropdownStyle.dropdownContainerStyle}
    placeholderStyle={DropdownStyle.dropdownPlaceholderStyle}
    selectedTextStyle={DropdownStyle.dropdownSelectedTextStyle}
    itemContainerStyle={DropdownStyle.dropdownItemContainerStyle}
    itemTextStyle={DropdownStyle.dropdownItemTextStyle}
    data={props.data}
    maxHeight={300}
    labelField='label'
    valueField='value'
    placeholder={props.placeholder}
    value={props.value}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onChange={props.onChange}
  />;
};

export default PaddockSelector;
