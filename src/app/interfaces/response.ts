export interface ApiResponse<T> {
  status: number,
  data?: T;
  message?: string;
  success?: boolean;
  errors?: any
}
