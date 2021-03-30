import React, { useEffect, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';

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

const Timer: React.FC<Props> = ({
  startTime,
  alertingTime = 5,
  onTimesUp,
  style,
}) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(last => {
        if (last <= 0) {
          clearInterval(interval);
          return last;
        }
        return last - 0.5;
      });
    }, 500); //each count lasts for half second (for blinking effect)
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

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
};

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
