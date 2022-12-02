import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import NavType from 'utils/NavType';
import { Colors, TextStyles } from '../../styles';

const WIDTH = Dimensions.get('window').width;

const FormHeader = (props: {
  title: string,
  nav: NavType,
}) => {
  return <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: WIDTH * 0.9,
      marginBottom: 10,
    }}
  >

    <TouchableOpacity
      onPress={props.nav.goBack}
      style={{
        width: WIDTH * 0.1,
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: Colors.primary.lightOrange,
          borderRadius: 5,
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.primary.mainOrange,
            fontSize: 25,
          }}
        >
          ←
        </Text>
      </View>
    </TouchableOpacity>

    <Text
      style={{
        fontSize: TextStyles.title.fontSize,
        fontFamily: TextStyles.subHeading.fontFamily,
        color: Colors.primary.mainOrange,
        marginTop: 5,
        alignSelf: 'center',
      }}
    >
      {props.title}
    </Text>

    <View
      style={{
        width: WIDTH * 0.1,
      }}
    >
    </View>
  </View>;
};

export default FormHeader;
