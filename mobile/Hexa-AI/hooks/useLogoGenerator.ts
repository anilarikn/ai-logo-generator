import { useEffect, useMemo, useState } from 'react';
import { generateLogo, fetchTask } from '../services/logoGenerateService';
import { fetchStyles, type LogoStyle } from '../services/styleService';

export type GenerationStatus =
  | 'idle'
  | 'queued'
  | 'processing'
  | 'done'
  | 'failed';

const SURPRISE_PROMPTS = [
  'A futuristic tech company logo with sleek lines',
  'A vintage coffee shop logo with a rustic feel',
  "A playful children’s brand logo with bright colors",
  'An elegant fashion brand logo with minimalist design',
];

type UseLogoGeneratorReturn = {
  prompt: string;
  styles: LogoStyle[];
  selectedStyle: LogoStyle | null;
  status: GenerationStatus;
  resultImageUrl: string | null;
  isProcessing: boolean;
  canSubmit: boolean;
  handleChangePrompt: (text: string) => void;
  handleSelectStyle: (style: LogoStyle) => void;
  handleGenerate: () => Promise<void>;
  handleRetry: () => Promise<void>;
  handleSurprisePress: () => void;
};

export function useLogoGenerator(): UseLogoGeneratorReturn {
  const [prompt, setPrompt] = useState('');
  const [styles, setStyles] = useState<LogoStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [taskId, setTaskId] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await fetchStyles();
        if (!active) return;

        setStyles(data);

        if (!selectedStyle && data.length > 0) {
          setSelectedStyle(data[0]);
        }
      } catch (error) {
        console.error('Failed to load styles', error);
      }
    })();

    return () => {
      active = false;
    };

  }, []);

  const isProcessing = status === 'queued' || status === 'processing';
  const canSubmit = useMemo(
    () => !!prompt.trim() && !!selectedStyle && !isProcessing,
    [prompt, selectedStyle, isProcessing],
  );

  const handleChangePrompt = (text: string) => {
    setPrompt(text);
  };

  const handleSelectStyle = (style: LogoStyle) => {
    setSelectedStyle(style);
  };

  const internalGenerate = async () => {
    if (!prompt.trim() || !selectedStyle) return;

    try {
      setStatus('processing');
      setResultImageUrl(null);

      const response = await generateLogo({
        prompt,
        style: selectedStyle.id,
      });

      setTaskId(response.job_id);

      if (response.status === 'queued' || response.status === 'processing') {
        setStatus('processing');
      } else if (response.status === 'done' || response.status === 'failed') {
        setStatus(response.status);
        setResultImageUrl(response.image_url ?? null);
      }
    } catch (error) {
      console.error('generateLogo failed', error);
      setStatus('failed');
    }
  };

  const handleGenerate = async () => {
    if (!canSubmit) return;
    await internalGenerate();
  };

  const handleRetry = async () => {
    if (!prompt.trim() || !selectedStyle) return;
    setStatus('processing');
    await internalGenerate();
  };

  const handleSurprisePress = () => {
    const randomIndex = Math.floor(Math.random() * SURPRISE_PROMPTS.length);
    setPrompt(SURPRISE_PROMPTS[randomIndex]);
  };

  useEffect(() => {
    if (!taskId) return;
    if (status !== 'processing') return;

    let isActive = true;

    const intervalId = setInterval(async () => {
      try {
        const task = await fetchTask(taskId);
        if (!isActive) return;

        if (task.status === 'done' || task.status === 'failed') {
          setStatus(task.status);
          setResultImageUrl(task.image_url || null);
          clearInterval(intervalId);
        } else if (task.status === 'queued' || task.status === 'processing') {
          setStatus('processing');
        }
      } catch (error) {
        if (!isActive) return;
        console.error('fetchTask failed', error);
      }
    }, 2000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [taskId, status]);

  return {
    prompt,
    styles,
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
  };
}
