import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GradientBackground from "../../components/layout/GradientBackground";
import TextArea from "../../components/ui/TextArea";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StyleCard from "../../components/ui/StyleCard";
import Banner from "../../components/ui/Banner";
import { colors } from "../../theme/colors";

import type { LogoStackParamList } from '../../navigation/LogoFlowNavigator';


import { LogoStyle } from "./types";
import { LOGO_STYLES } from "./constants";

import { useLogoGenerator } from "../../hooks/useLogoGenerator";

type LogoNav = NativeStackNavigationProp<LogoStackParamList, 'Input'>;


export default function LogoGeneratorScreen() {

  const navigation = useNavigation<LogoNav>();

  const {
    prompt,
    selectedStyle,
    status,
    resultImageUrl,
    isProcessing,
    canSubmit,
    handleChangePrompt,
    handleSelectStyle,
    handleGenerate,
    handleRetry,
    handleSurprisePress,
  } = useLogoGenerator();

  const renderBanner = () => {
    if (status === "queued" || status === "processing") {
      return (
        <Banner
          variant="info"
          loading
          title="Creating Your Design..."
          subtitle="This usually takes under 2 minutes."
        />
      );
    }

    if (status === "done") {
      return (
        <Banner
          variant="success"
          title="Your Design is Ready!"
          subtitle="Tap to view it."
          successImageUrl={resultImageUrl || undefined}
          onPress={() => {
            if (!resultImageUrl) return;

            navigation.navigate('Output', {
              prompt,
              styleLabel: selectedStyle.id,
              imageUrl: resultImageUrl,
            });
          }}
        />
      );
    }

    if (status === "failed") {
      return (
        <Banner
          variant="error"
          title="Oops, something went wrong!"
          subtitle="Tap to retry."
          onPress={handleRetry}
        />
      );
    }

    return null;
  };

  const renderStyleItem = ({ item }: { item: LogoStyle }) => (
    <StyleCard
      label={item.label}
      subtitle={item.subtitle}
      icon={item.icon}
      selected={item.id === selectedStyle.id}
      onPress={() => handleSelectStyle(item)}
    />
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              style={styles.flex}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.appTitle}>AI Logo</Text>
                </View>

                {renderBanner()}

                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Enter Your Prompt</Text>

                  <Pressable
                    style={styles.surpriseButton}
                    onPress={handleSurprisePress}
                  >
                    <Text style={styles.surpriseEmoji}>🎲</Text>
                    <Text style={styles.surpriseText}>Surprise me</Text>
                  </Pressable>
                </View>

                <TextArea
                  value={prompt}
                  onChangeText={handleChangePrompt}
                  placeholder="A blue lion logo reading 'HEXA' in bold letters"
                />

                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Logo Styles</Text>
                </View>
              </View>

              <View style={styles.stylesCarouselWrapper}>
                <FlatList
                  data={LOGO_STYLES}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.stylesList}
                  renderItem={renderStyleItem}
                />
              </View>

              <View style={styles.contentBottomSpacer} />
            </ScrollView>
          </KeyboardAvoidingView>

          <View style={styles.bottomArea}>
            <PrimaryButton
              title="Create"
              onPress={handleGenerate}
              loading={isProcessing}
              disabled={!canSubmit}
            />
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
    );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 10,
  },
  appTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  surpriseButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  surpriseEmoji: {
    fontSize: 10,
    marginRight: 4,
  },
  surpriseText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  stylesCarouselWrapper: {
    marginTop: 4,
  },
  stylesList: {
    paddingVertical: 8,
    paddingLeft: 24,
    paddingRight: 12,
  },
  contentBottomSpacer: {
    height: 16,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
