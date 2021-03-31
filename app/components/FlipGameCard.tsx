import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import FlipCard from 'react-native-card-flip';
import { Card, Text } from 'react-native-paper';

interface Props extends ViewProps {
  cardRef: React.RefObject<FlipCard>;
  value: string;
  onCardFlip: (index: number) => void;
}

const FlipGameCard: React.FC<Props> = ({
  cardRef,
  value,
  style,
  onCardFlip,
}) => {
  const jiggle = () => {
    if (cardRef.current) {
      cardRef.current.jiggle({ count: 1, duration: 100, progress: 0.05 });
    }
  };
  const flip = () => {
    if (cardRef.current) {
      cardRef.current.flip();
    }
  };
  return (
    <FlipCard
      style={[styles.cardContainer]}
      ref={cardRef}
      onFlipEnd={onCardFlip}>
      <Card style={[styles.card, styles.cardFront, style]} onPress={flip}>
        <View style={styles.cardFrontInner} />
      </Card>
      <Card style={[styles.card, style]} onPress={jiggle}>
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
  },
  timeText: {
    alignSelf: 'center',
    fontSize: 40,
    margin: 10,
    textAlign: 'center',
  },
});

export default FlipGameCard;
