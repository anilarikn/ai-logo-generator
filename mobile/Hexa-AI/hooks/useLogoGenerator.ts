import { useEffect, useState } from "react";
import { generateLogo, fetchTask } from "../services/logoGenerateService";
import { GenerationStatus, LogoStyle } from "../screens/InputScreen/types";
import { LOGO_STYLES, SURPRISE_PROMPTS } from "../screens/InputScreen/constants";

type UseLogoGenerationReturn = {
  prompt: string;
  selectedStyle: LogoStyle;
  status: GenerationStatus;
  resultImageUrl: string | null;
  isProcessing: boolean;
  canSubmit: boolean;
  handleChangePrompt: (value: string) => void;
  handleSelectStyle: (style: LogoStyle) => void;
  handleGenerate: () => Promise<void>;
  handleRetry: () => void;
  handleSurprisePress: () => void;
};

export function useLogoGenerator(): UseLogoGenerationReturn {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>(LOGO_STYLES[0]);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  const handleChangePrompt = (value: string) => {
    setPrompt(value);
  };

  const handleSelectStyle = (style: LogoStyle) => {
    setSelectedStyle(style);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setStatus("processing");
      setResultImageUrl(null);

      const response = await generateLogo({
        prompt,
        style: selectedStyle.id === "none" ? null : selectedStyle.id,
      });

      setTaskId(response.job_id);

      if (response.status === "queued" || response.status === "processing") {
        setStatus("processing");
      } else if (response.status === "done" || response.status === "failed") {
        setStatus(response.status);
      }
    } catch {
      setStatus("failed");
    }
  };

  const handleRetry = () => {
    if (!prompt.trim()) return;
    setStatus("processing");
    void handleGenerate();
  };

  const handleSurprisePress = () => {
    const randomIndex = Math.floor(Math.random() * SURPRISE_PROMPTS.length);
    setPrompt(SURPRISE_PROMPTS[randomIndex]);
  };

  useEffect(() => {
    if (!taskId) return;
    if (status !== "processing") return;

    let isActive = true;

    const intervalId = setInterval(async () => {
      try {
        const task = await fetchTask(taskId);

        if (!isActive) return;

        if (task.status === "done" || task.status === "failed") {
          setStatus(task.status);
          setResultImageUrl(task.image_url || null);
          clearInterval(intervalId);
        } else if (task.status === "queued" || task.status === "processing") {
          setStatus("processing");
        }
      } catch {
        if (!isActive) return;
      }
    }, 2000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [taskId, status]);

  const isProcessing =
    status === "processing" || status === "queued" || status === undefined;
  const canSubmit = !!prompt.trim();

  return {
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
  };
}
