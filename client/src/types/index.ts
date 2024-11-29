// Response Types
export interface ValidationErrors {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface ApiResponse<T> {
  status: "success" | "fail";
  message: string;
  data: T;
  errors: string[];
  timestamp: string;
}

export interface LoginResponseData {
  user: User;
  token: string;
}

// Data Types
export interface User {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}
