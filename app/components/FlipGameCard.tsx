import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import FlipCard from 'react-native-card-flip';
import { Card, Text } from 'react-native-paper';

interface Props {
  value: string;
  style?: ViewStyle;
}

const FlipGameCard: React.FC<Props> = ({ value, style }) => {
  const [cardRef, setCardRef] = useState<FlipCard | null>(null);
  return (
    <FlipCard style={[styles.cardContainer, style]} ref={setCardRef}>
      <Card
        style={[styles.card, styles.cardFront]}
        onPress={() => cardRef?.flip()}>
        <View style={styles.cardFrontInner} />
      </Card>
      <Card style={styles.card} onPress={() => cardRef?.flip()}>
        <Text style={styles.timeText}>{value}</Text>
      </Card>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 80,
    height: 80,
  },
  card: {
    flex: 1,
    margin: 10,
  },
  cardFront: {
    backgroundColor: 'black',
  },
  cardFrontInner: {
    flex: 1,
    backgroundColor: 'orange',
    margin: 5,
  },
  cardBack: {
    flex: 1,
    margin: 10,
  },
  timeText: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default FlipGameCard;
