import { apiClient } from '../config/api';

export type StyleApiResponse = {
  id: string;
  label: string;
  slug: string;
  image_url: string;
  order: number;
  active: boolean;
  created_at: string;
};

export type LogoStyle = {
  id: string;
  label: string;
  subtitle?: string | null;
  icon: string;
};

export async function fetchStyles(): Promise<LogoStyle[]> {
  const res = await apiClient.get<StyleApiResponse[]>('/styles');

  return res.data
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.slug,
      label: item.label,
      subtitle: null,
      icon: item.image_url,
    }));
}
