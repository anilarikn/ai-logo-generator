import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { colors } from '../../theme/colors';

type BannerProps = {
  variant: 'info' | 'success' | 'error';
  title: string;
  subtitle?: string;
  loading?: boolean;
  successImageUrl?: string,
  onPress?: () => void;
};

const ERROR_ICON = require('../../assets/img/bannerIcons/Subtract.png');

export default function Banner({
  variant,
  title,
  subtitle,
  loading = false,
  successImageUrl,
  onPress,
}: BannerProps) {
  const theme = colors.banner[variant];

  const renderLeftContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={theme.icon} />;
    }

    if (variant === 'error') {
      return <Image source={ERROR_ICON} style={styles.iconImage} />;
    }

    if (variant === 'success' && successImageUrl) {
      return (
        <Image
          source={{ uri: successImageUrl }}
          style={styles.thumbnail}
        />
      );
    }
  };

  const showLeft = true;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.inner, { backgroundColor: theme.bg }]}>
        {showLeft && (
          <View style={[styles.left, { backgroundColor: theme.leftBg }]}>
            {renderLeftContent()}
          </View>
        )}

        <View style={styles.right}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {title}
          </Text>
          {!!subtitle && (
            <Text
              style={[styles.subtitle, { color: theme.subtitle }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  inner: {
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  left: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },
  right: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
