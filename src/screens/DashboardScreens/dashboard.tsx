import { SafeAreaView, ScrollView, View } from 'react-native';
import GlobalStyle from 'utils/styles/GlobalStyle';

const DashboardPage = () => {

  const ViewScoreButton = (props: { title: string, score: number }) => <View>
    <h4>{props.title}</h4>
    <h2>{props.score}</h2>
  </View>;

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        {/* Cow status bars */}
        <View>
          <View>
            <h3>days</h3>
          </View>
          <View>
            <h3>days</h3>
          </View>
        </View>

        <View>
          <h3>Ranch Status</h3>
          {/* Buttons/views of different scores */}
          <View>
            <ViewScoreButton title='Body Condition Score' score={5} />
            <ViewScoreButton title='Target before next critical period' score={5} />
            <ViewScoreButton title='Dung' score={5} />
            <ViewScoreButton title='Forage Quality' score={5} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardPage;
