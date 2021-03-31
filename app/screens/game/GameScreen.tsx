import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import GameCardsGroup from '../../components/GameCardsGroup';
import Timer from '../../components/Timer';

const GameScreen = () => {
  const [result, setResult] = useState<string | null>(null);
  const onTimesUp = useCallback(() => setResult('Game Over!'), []);
  return (
    <View>
      <Timer startTime={10} onTimesUp={onTimesUp} />
      <GameCardsGroup />
      {result && <Text>{result}</Text>}
    </View>
  );
};

export default GameScreen;
