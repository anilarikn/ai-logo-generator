import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import GradientBackground from '../../components/layout/GradientBackground';
import PromptCard from './PromptSummaryCard';
import { colors } from '../../theme/colors';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { LogoStackParamList } from '../../navigation/LogoFlowNavigator';

type OutputRouteProp = RouteProp<LogoStackParamList, 'Output'>;

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width - 48;

export default function OutputScreen() {
  const navigation = useNavigation();
  const route = useRoute<OutputRouteProp>();
  const { imageUrl, prompt, styleLabel } = route.params;

  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    if (prompt) {
      copyToClipboard(prompt);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Your Design</Text>

            <Pressable
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.imageWrapper}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>No image</Text>
              </View>
            )}
          </View>

          <PromptCard
            prompt={prompt}
            styleLabel={styleLabel}
            onCopyPress={handleCopy}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: 20,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardSoftBg,
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
