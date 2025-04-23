import { AxiosInstance } from "@/config/axios";

type Callbacks<T> = {
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
};

export const GetRequest = async <T>(
  url: string,
  { onSuccess, onError }: Callbacks<T>
): Promise<void> => {
  try {
    const response = await AxiosInstance.get<T>(url);
    onSuccess(response.data);
  } catch (error: any) {
    const err = new Error(error?.response?.data?.message || 'Something went wrong');
    if (onError) onError(err);
    else console.error(err);
  }
};

export const PostRequest = async <T>(
  url: string,
  body: any,
  { onSuccess, onError }: Callbacks<T>
): Promise<void> => {
  try {
    const response = await AxiosInstance.post<T>(url, body);
    if(response.status != 200){
      onError(response.data);
    }
    onSuccess(response.data);
  } catch (error: any) {
    const err = new Error(error?.response?.data?.message || 'Something went wrong');
    if (onError) onError(err);
    else console.error(err);
  }
};

