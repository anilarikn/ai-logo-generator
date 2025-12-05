import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../theme/colors";

type OutputHeaderProps = {
  title: string;
  onClose: () => void;
};

export default function OutputHeader({ title, onClose }: OutputHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>{title}</Text>

      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 4,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 24,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: 18,
  },
});
