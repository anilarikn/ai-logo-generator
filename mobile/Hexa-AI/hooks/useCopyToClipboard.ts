import { useCallback } from "react";
import * as Clipboard from "expo-clipboard";

export function useCopyToClipboard() {
  const copyToClipboard = useCallback((text: string) => {
    if (!text) {
      return;
    }

    Clipboard.setStringAsync(text).catch(() => {
      console.warn("Failed to copy text to clipboard");
    });
  }, []);

  return { copyToClipboard };
}
