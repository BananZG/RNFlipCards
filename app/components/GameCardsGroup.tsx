import React, { createRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { shuffle } from 'lodash';
import FlipGameCard from './FlipGameCard';
import FlipCard from 'react-native-card-flip';

export type GameCardsGroupType = {
  resetGame: () => void;
};

interface GameCardsGroupProps {
  onWin: () => void;
}

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

const GameCardsGroup = React.forwardRef<
  GameCardsGroupType,
  GameCardsGroupProps
>(({ onWin }, ref) => {
  const getNewGame = (gameSet: string[]) =>
    shuffle(gameSet.reduce((a: string[], b: string) => [...a, b, b], [])).map(
      e => ({
        value: e,
        hasFlipped: false,
        hasMatched: false,
        cardRef: createRef<FlipCard>(),
      }),
    );
  useImperativeHandle(ref, () => ({
    resetGame: () => {
      setGame([]);
      setTimeout(() => setGame(getNewGame(defaultGameSet)), 0);
    },
  }));

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
      const win = !newGame.some(e => !e.hasMatched);
      if (win) {
        onWin();
      }
    }
    newGame.forEach(e => {
      if (e.hasFlipped) {
        e.cardRef.current?.flip();
        e.hasFlipped = false;
      }
    });
    setGame(newGame);
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
    </View>
  );
});

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
