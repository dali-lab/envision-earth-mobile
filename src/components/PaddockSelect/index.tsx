import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import GlobalStyle from '../../utils/styles/GlobalStyle';

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
    style={[GlobalStyle.dropdown, props.focus && { borderColor: 'blue' }]}
    containerStyle={GlobalStyle.dropdownContainerStyle}
    placeholderStyle={GlobalStyle.dropdownPlaceholderStyle}
    selectedTextStyle={GlobalStyle.dropdownSelectedTextStyle}
    itemContainerStyle={GlobalStyle.dropdownItemContainerStyle}
    itemTextStyle={GlobalStyle.dropdownItemTextStyle}
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
