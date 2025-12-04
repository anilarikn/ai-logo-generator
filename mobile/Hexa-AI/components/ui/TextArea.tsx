import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';

type TextAreaProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
};

export default function TextArea({
  value,
  onChangeText,
  placeholder,
  maxLength = 500,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const length = value.length;

  return (
    <View style={[styles.wrapper, focused && styles.focused]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline
        style={styles.input}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Text style={styles.counter}>
        {length}/{maxLength}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: colors.textPrimary,
  },
  input: {
    minHeight: 120,
    maxHeight: 180,
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  counter: {
    marginTop: 8,
    alignSelf: 'flex-start',
    fontSize: 12,
    color: colors.textMuted,
  },
});
