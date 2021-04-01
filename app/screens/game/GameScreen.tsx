import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import GameCardsGroup, {
  GameCardsGroupType,
} from '../../components/GameCardsGroup';
import Timer, { TimerType } from '../../components/Timer';

const GameScreen = () => {
  let gameTime = 80;
  const timerRef = useRef<TimerType>(null);
  const gameRef = useRef<GameCardsGroupType>(null);
  const [result, setResult] = useState<string | null>(null);
  const onTimesUp = useCallback(() => setResult('Game Over!'), []);
  const resetGame = () => {
    setResult(null);
    timerRef.current?.resetTimer();
    gameRef.current?.resetGame();
  };
  const onWin = () => {
    timerRef.current?.stopTimer();
    setResult(`Win with time left: ${timerRef.current?.time}`);
    // TODO: save into scoreboard
  };
  return (
    <View>
      <Timer ref={timerRef} startTime={gameTime} onTimesUp={onTimesUp} />
      <GameCardsGroup ref={gameRef} onWin={onWin} />
      {!!result && <Text style={styles.resultText}>{result}</Text>}
      <Button onPress={resetGame}>Reset Game</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  resultText: {
    alignSelf: 'center',
  },
});

export default GameScreen;
