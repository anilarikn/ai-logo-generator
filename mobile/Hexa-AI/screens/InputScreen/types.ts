import { ImageSourcePropType, Task } from 'react-native';
import { TaskStatus } from '../../services/logoGenerateService';


export type GenerationStatus = 'idle' | TaskStatus;

export type LogoStyle = {
  id: string;
  label: string;
  subtitle?: string;
  icon: ImageSourcePropType;
};
