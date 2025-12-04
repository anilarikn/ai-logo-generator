import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../../theme/colors';

const { height } = Dimensions.get('window');

type GradientBackgroundProps = PropsWithChildren<{}>;

type BeamConfig = {
  id: string;
  color: string;
  alphaHex: string;
  topFactor: number;
  heightFactor: number;
  rotation: string;
};

const withAlpha = (hex: string, alphaHex: string) => `${hex}${alphaHex}`;

const BEAMS: BeamConfig[] = [
  {
    id: 'blue',
    color: colors.blueBright,
    alphaHex: 'AA',
    topFactor: 0.2,
    heightFactor: 0.3,
    rotation: '-45deg',
  },
  {
    id: 'pink',
    color: colors.pink,
    alphaHex: 'CC',
    topFactor: 0.4,
    heightFactor: 0.25,
    rotation: '45deg',
  },
  {
    id: 'purple',
    color: colors.purple,
    alphaHex: 'CC',
    topFactor: 0.6,
    heightFactor: 0.25,
    rotation: '-45deg',
  },
];

export default function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.bgBase, colors.bgDark]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.beamsContainer}>
        {BEAMS.map((beam) => (
          <LinearGradient
            key={beam.id}
            colors={[
              'transparent',
              withAlpha(beam.color, beam.alphaHex),
              'transparent',
            ]}
            locations={[0, 0.5, 1]}
            style={[
              styles.beam,
              {
                top: height * beam.topFactor,
                height: height * beam.heightFactor,
                transform: [{ rotate: beam.rotation }],
              },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ))}

        <BlurView
          intensity={75}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  beamsContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
  },
  beam: {
    position: 'absolute',
    width: '140%',
    right: '-20%',
  },
});
