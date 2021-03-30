import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Routes, WelcomeScreenNavigationProp } from '../../types/navigations';

type Config = {
  title: string;
  route: Routes;
};
const Configs: Config[] = [
  {
    title: 'Start a new game',
    route: 'GameScreen',
  },
  {
    title: 'Scoreboard',
    route: 'ScoreboardScreen',
  },
];

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({
    item: { title, route },
  }: ListRenderItemInfo<Config>) => (
    <Card
      key={title}
      style={styles.card}
      onPress={() => navigation.navigate(route)}>
      <Title style={styles.titleText}>{title}</Title>
    </Card>
  );
  const keyExtractor = (_: Config, i: number): string => i.toString();
  return (
    <View>
      <View style={styles.icon} />
      <View style={styles.menu}>
        <FlatList
          data={Configs}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'orange',
    // TODO: make a cute icon / logo
    height: '50%',
  },
  menu: {
    backgroundColor: 'grey',
    height: '50%',
  },
  card: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  titleText: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
  },
});

export default WelcomeScreen;
