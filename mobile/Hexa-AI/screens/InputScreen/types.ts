import { ImageSourcePropType } from 'react-native';

export type GenerationStatus = 'idle' | 'processing' | 'done' | 'failed';

export type LogoStyle = {
  id: string;
  label: string;
  subtitle?: string;
  icon: ImageSourcePropType;
};
