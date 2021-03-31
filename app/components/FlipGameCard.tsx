import React, { useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import FlipCard from 'react-native-card-flip';
import { Card, Text } from 'react-native-paper';

interface Props extends ViewProps {
  value: string;
  onCardFlip: (index: number) => void;
}

const FlipGameCard: React.FC<Props> = ({ value, style, onCardFlip }) => {
  const cardRef = useRef<FlipCard>(null);
  const jiggle = () => {
    if (cardRef && cardRef.current) {
      cardRef.current.jiggle({ count: 1, duration: 100, progress: 0.05 });
    }
  };
  const flip = () => {
    if (cardRef && cardRef.current) {
      cardRef.current.flip();
    }
  };
  return (
    <FlipCard
      style={[styles.cardContainer, style]}
      ref={cardRef}
      onFlipEnd={onCardFlip}>
      <Card style={[styles.card, styles.cardFront]} onPress={flip}>
        <View style={styles.cardFrontInner} />
      </Card>
      <Card style={styles.card} onPress={jiggle}>
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
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
  },
});

export default FlipGameCard;
