import { apiClient } from '../config/api';

export type TaskStatus = 'queued' | 'processing' | 'done' | 'failed';

export type GenerateLogoPayload = {
  prompt: string;
  style?: string | null;
};

export type GenerateLogoResponse = {
  job_id: string;
  status: TaskStatus;
};

export type TaskDetailResponse = {
  job_id: string;
  status: TaskStatus;
  image_url?: string;
};

export async function generateLogo(
  payload: GenerateLogoPayload,
): Promise<GenerateLogoResponse> {
  const { data } = await apiClient.post<GenerateLogoResponse>(
    '/jobs/generate',
    payload,
  );

  return data;
}

export async function fetchTask(taskId: string): Promise<TaskDetailResponse> {
  const { data } = await apiClient.get<TaskDetailResponse>(
    `/jobs/${taskId}`,
  );

  return data;
}
