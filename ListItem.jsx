import React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const ListItem = ({ text, delay }) => {
  const slideAnim = new Animated.Value(-100); // Start position off screen

  Animated.timing(
    slideAnim,
    {
      toValue: 0,
      duration: 500,
      delay: delay * 100, // Adjust the delay based on index
      useNativeDriver: true,
    }
  ).start();

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
  },
});

export default ListItem;
