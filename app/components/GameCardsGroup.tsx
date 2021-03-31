import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { shuffle } from 'lodash';
import FlipGameCard from './FlipGameCard';

interface Props {}

type GameCard = {
  value: string;
  hasFlipped: boolean;
  hasMatched: boolean;
};

const GameCardsGroup: React.FC<Props> = ({}) => {
  const [game, setGame] = useState<GameCard[]>(
    shuffle(
      ['🥕', '🍔', '🍍', '🍠', '🌮', '🏀', '🎮', '🎧'].reduce(
        (a: string[], b: string) => [...a, b, b],
        [],
      ),
    ).map(e => ({
      value: e,
      hasFlipped: false,
      hasMatched: false,
    })),
  );
  const onCardFlip = (item: string, index: number, hasFlippedUp: boolean) => {
    // make a copy
    const newGame = game.slice();
    // update current card to flipped first
    newGame[index].hasFlipped = hasFlippedUp;
    // if is trying to match > 2 cards
    const nFlipped = newGame.filter(e => e.hasFlipped).length;
    // if has matched
    const matched = newGame
      .filter(e => e.value === item)
      .map(e => e.hasFlipped)
      .reduce((a, b) => a === b);
    newGame[index].hasMatched = matched;
    if (nFlipped >= 2 || matched) {
      newGame.forEach(e => (e.hasFlipped = false));
    }
    setGame(newGame);
  };
  return (
    <View style={styles.cardContainer}>
      {game.map(({ value, hasFlipped, hasMatched }, i) => (
        <FlipGameCard
          key={i}
          disabled={hasFlipped || hasMatched}
          style={styles.card}
          value={value}
          onCardFlip={(index: number) => onCardFlip(value, i, index > 0)}
        />
      ))}
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
