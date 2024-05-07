import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, TouchableOpacity, Button } from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [rotateAnim] = useState(new Animated.Value(0)); // Initial value for rotation: 0
  const [showButton, setShowButton] = useState(false);
  const buttonOpacity = useRef(new Animated.Value(0)).current; // Initial value for button opacity: 0

  const item1Anim = useRef(new Animated.Value(-1000)).current;
  const item2Anim = useRef(new Animated.Value(-1000)).current;
  const item3Anim = useRef(new Animated.Value(-1000)).current;

  // Effect to handle the fade-in animation and show the button
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowButton(true); // Show the button after fade-in animation completes
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(); // Fade in the button
    });
  }, [fadeAnim]);

  // Function to handle rotation animation
  const handleRotate = () => {
    Animated.timing(rotateAnim, {
      toValue: rotateAnim._value === 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Function to slide in items
  const slideInItems = () => {
    const slideAnimation = (itemRef, delay) => {
      return Animated.timing(itemRef, {
        toValue: 0,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      });
    };

    Animated.parallel([
      slideAnimation(item1Anim, 0),
      slideAnimation(item2Anim, 200),
      slideAnimation(item3Anim, 400),
    ]).start();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleRotate}>
        <Animated.View // Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim, // Bind opacity to animated value
            transform: [{ rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }) }], // Apply rotation
            borderRadius: 50,
          }}>
          {props.children}
        </Animated.View>
      </TouchableOpacity>
      {showButton && (
        <Animated.View
          style={{
            opacity: buttonOpacity,
            marginTop: 20,
          }}>
          <Button title="Press me" onPress={slideInItems} />
        </Animated.View>
      )}
      <Animated.View style={{ flexDirection: 'row' }}>
        <Animated.View style={{ transform: [{ translateX: item1Anim }] }}>
          <Text style={{ fontSize: 20, marginHorizontal: 5 }}>Item 1</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: item2Anim }] }}>
          <Text style={{ fontSize: 20, marginHorizontal: 5 }}>Item 2</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: item3Anim }] }}>
          <Text style={{ fontSize: 20, marginHorizontal: 5 }}>Item 3</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
          Fading in 
        </Text>
      </FadeInView>
    </View>
  );
};
