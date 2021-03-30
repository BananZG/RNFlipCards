import React from 'react';
import { StyleSheet, View } from 'react-native';
import FlipGameCard from './FlipGameCard';

interface Props {}

const GameCardsGroup: React.FC<Props> = ({}) => {
  return (
    <View style={styles.cardContainer}>
      <FlipGameCard style={styles.card} value="A" />
      <FlipGameCard style={styles.card} value="A" />
      <FlipGameCard style={styles.card} value="A" />
      <FlipGameCard style={styles.card} value="A" />
      <FlipGameCard style={styles.card} value="A" />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    margin: 5,
  },
});

export default GameCardsGroup;
