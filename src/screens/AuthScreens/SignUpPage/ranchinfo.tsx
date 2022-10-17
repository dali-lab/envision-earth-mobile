import { useState } from "react";
import { SafeAreaView } from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import GlobalStyle from "../../../utils/styles/GlobalStyle";

const RanchInfoPage = () => {
  const [ranchId, setRanchId] = useState<string>('');
  const [yearsRanching, setYearsRanching] = useState<number>(0);
  const [yearsHolistic, setYearsHolistic] = useState<number>(0);
  const [landSize, setLandSize] = useState<number>(0);

  const handleSubmit = () => {
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <AppTextInput
        onChangeText={(text) => setRanchId(text)}
        value={ranchId}
        placeholder='ranch ID #'
      />
      <AppTextInput
        onChangeText={(text) => setRanchId(text)}
        value={ranchId}
        placeholder='ranch ID #'
      />
      <AppTextInput
        onChangeText={(text) => setRanchId(text)}
        value={ranchId}
        placeholder='ranch ID #'
      />
      <AppTextInput
        onChangeText={(text) => setRanchId(text)}
        value={ranchId}
        placeholder='ranch ID #'
      />
    </SafeAreaView>
  );
};

export default RanchInfoPage;
