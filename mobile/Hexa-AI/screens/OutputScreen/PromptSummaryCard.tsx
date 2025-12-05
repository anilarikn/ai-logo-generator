import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../../theme/colors';

type PromptCardProps = {
  prompt: string;
  styleLabel: string;
  onCopyPress: () => void;
};

const COPY_ICON = require('../../assets/copy.png'); 


export default function PromptCard({
  prompt,
  styleLabel,
  onCopyPress,
}: PromptCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Prompt</Text>

        <Pressable style={styles.copyButton} onPress={onCopyPress}>
          <Image source={COPY_ICON} style={styles.copyIcon} />
          <Text style={styles.copyText}>Copy</Text>
        </Pressable>
      </View>

      <Text style={styles.promptText}>{prompt}</Text>

      <View style={styles.stylePill}>
        <Text style={styles.stylePillText}>{styleLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: colors.textSecondary,
    resizeMode: 'contain',
  },
  copyText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  promptText: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  stylePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.cardSoftBg,
  },
  stylePillText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
});
