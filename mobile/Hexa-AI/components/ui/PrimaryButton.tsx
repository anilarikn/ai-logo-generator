import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

type PrimaryButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={styles.touchable}
    >
      <LinearGradient
        colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button, isDisabled && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.textPrimary} />
        ) : (
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.sparkle}>✨</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  button: {
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
  sparkle: {
    color: colors.textPrimary,
    fontSize: 17,
    marginLeft: 4,
  },
});
