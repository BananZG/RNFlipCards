import React, { useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';

export type TimerType = {
  resetGame: () => void;
};
interface Props {
  startTime: number;
  alertingTime?: number;
  onTimesUp?: () => void;
  style?: ViewStyle;
}

const formatSeconds = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toFixed(0).padStart(2, '0')} : ${seconds
    .toFixed(0)
    .padStart(2, '0')}`;
};

let countdownTimeout: ReturnType<typeof setTimeout>;
const Timer = React.forwardRef<TimerType, Props>(
  ({ startTime, alertingTime = 5, onTimesUp, style }, ref) => {
    const [time, setTime] = useState(startTime);

    useImperativeHandle(ref, () => ({
      resetGame: () => {
        clearTimeout(countdownTimeout);
        setTime(startTime);
      },
    }));

    // Clean up timeouts when the screen is unmounted
    useEffect(() => {
      return (): void => {
        clearTimeout(countdownTimeout);
      };
    }, []);

    useEffect(() => {
      if (time > 0) {
        // during alertingTime period, update every 0.5 sec to show blinking effect
        const multiplier = time <= alertingTime ? 0.5 : 1;
        countdownTimeout = setTimeout(() => {
          setTime(time - 1 * multiplier);
        }, 1000 * multiplier);
      }
    }, [alertingTime, time]);

    useEffect(() => {
      if (time <= 0) {
        onTimesUp && onTimesUp();
      }
    }, [onTimesUp, time]);

    const isAlerting = time <= alertingTime && time % 1 === 0;

    return (
      <Card style={[styles.card, style]}>
        <Text style={[styles.timeText, isAlerting ? styles.redText : {}]}>
          {formatSeconds(time)}
        </Text>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  timeText: {
    alignSelf: 'center',
    margin: 10,
  },
  redText: {
    color: 'red',
  },
});

export default Timer;
