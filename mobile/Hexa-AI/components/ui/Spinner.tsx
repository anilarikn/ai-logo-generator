import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export default function ThinSpinner({ size = 40, color = "#ffffff" }) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderWidth: 3,
        borderColor: color + "55",
        borderTopColor: color,
        borderRadius: size / 2,
        transform: [{ rotate: spin }],
      }}
    />
  );
}
