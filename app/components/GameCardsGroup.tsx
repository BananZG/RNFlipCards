import React, { createRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { shuffle } from 'lodash';
import FlipGameCard from './FlipGameCard';
import { Button } from 'react-native-paper';
import FlipCard from 'react-native-card-flip';

interface Props {}

type GameCard = {
  value: string;
  cardRef: React.RefObject<FlipCard>;
  hasFlipped: boolean;
  hasMatched: boolean;
};

const defaultGameSet = [
  '🥕',
  '🍔',
  '🍍',
  '🍠',
  '🌮',
  '🏀',
  '🎮',
  '🎧',
  '🥐',
  '🍷',
];

const GameCardsGroup: React.FC<Props> = ({}) => {
  const getNewGame = (gameSet: string[]) =>
    shuffle(gameSet.reduce((a: string[], b: string) => [...a, b, b], [])).map(
      e => ({
        value: e,
        hasFlipped: false,
        hasMatched: false,
        cardRef: createRef<FlipCard>(),
      }),
    );

  const [game, setGame] = useState<GameCard[]>(getNewGame(defaultGameSet));
  const onCardFlip = (item: string, index: number, hasFlippedUp: boolean) => {
    // make a copy
    const newGame = game.slice();
    // update current card to flipped first
    newGame[index].hasFlipped = hasFlippedUp;
    // if is trying to match > 2 cards
    const flippedCards = newGame.filter(e => e.hasFlipped);
    if (flippedCards.length < 2) {
      setGame(newGame);
      return;
    }
    const matched = !flippedCards.some(e => e.value !== item);
    if (matched) {
      flippedCards.forEach(e => {
        e.hasFlipped = false;
        e.hasMatched = true;
      });
    }
    newGame.forEach(e => {
      if (e.hasFlipped) {
        e.cardRef.current?.flip();
        e.hasFlipped = false;
      }
    });
    setGame(newGame);
  };
  const resetGame = () => {
    setGame([]);
    setTimeout(() => setGame(getNewGame(defaultGameSet)), 100);
  };
  return (
    <View>
      <View style={styles.cardContainer}>
        {game.map(({ cardRef, value, hasMatched }, i) => {
          return (
            <FlipGameCard
              key={i}
              cardRef={cardRef}
              style={[styles.card, hasMatched && styles.greenBorder]}
              value={value}
              onCardFlip={(index: number) => onCardFlip(value, i, index > 0)}
            />
          );
        })}
      </View>
      <Button onPress={resetGame}>Reset Game</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  greenBorder: {
    borderWidth: 1,
    borderColor: 'green',
  },
  card: {
    margin: 5,
  },
});

export default GameCardsGroup;
