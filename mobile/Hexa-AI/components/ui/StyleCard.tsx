import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../../theme/colors';

type StyleCardProps = {
  label: string;
  subtitle?: string;
  icon: string | ImageSourcePropType;
  selected?: boolean;
  onPress?: () => void;
};

const CARD_WIDTH = 90;
const CARD_HEIGHT = 114;

export default function StyleCard({
  label,
  subtitle,
  icon,
  selected = false,
  onPress,
}: StyleCardProps) {
  const source =
    typeof icon === 'string'
      ? { uri: icon }
      : icon;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.card, selected && styles.cardSelected]}>
        <Image source={source} style={styles.icon} />
      </View>

      <Text
        style={[styles.label, selected && styles.labelSelected]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 12,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.cardSoftBg,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  label: {
    marginTop: 6,
    fontSize: 11,
    color: colors.textMuted,
  },
  labelSelected: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  pressed: {
    opacity: 0.9,
  },
});
