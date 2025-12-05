import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../../theme/colors";
import Spinner from "../ui/Spinner";

type BannerProps = {
  variant: "info" | "success" | "error";
  title: string;
  subtitle?: string;
  loading?: boolean;
  successImageUrl?: string;
  onPress?: () => void;
};

const ERROR_ICON = require("../../assets/img/bannerIcons/Subtract.png");

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
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner size={25} />
        </View>
      );
    }

    if (variant === "error") {
      return <Image source={ERROR_ICON} style={styles.iconImage} />;
    }

    if (variant === "success" && successImageUrl) {
      return (
        <Image source={{ uri: successImageUrl }} style={styles.thumbnail} />
      );
    }
  };

  const showLeft = true;

  const content = (
    <>
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
    </>
  );

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.inner}>
        {showLeft && (
          <View style={[styles.left, { backgroundColor: theme.leftBg }]}>
            {renderLeftContent()}
          </View>
        )}

        {variant === "success" ? (
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.right}
          >
            {content}
          </LinearGradient>
        ) : (
          <View style={[styles.right, { backgroundColor: theme.bg }]}>
            {content}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  inner: {
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 60,
  },
  left: {
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  right: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  iconImage: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 13,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
