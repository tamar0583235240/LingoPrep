import { api } from './api';
import { User } from '../../features/auth/types/types';
interface GenerateCodeRequest {
  email: string;
}

interface GenerateCodeResponse {
  isSent: boolean;
  message: string;
}

interface validateCodeRequest {
  email: string;
  code: string;
  
}
interface validateCodeResponse {
  valid: boolean;
  message: string;
}

export const verifyCode = api.injectEndpoints({
  endpoints: (builder) => ({
    generateCode: builder.mutation<GenerateCodeResponse, GenerateCodeRequest>({
      query: (email) => ({
        url: '/auth/createValidationCode',
        method: 'POST',
        body: email,
      }),
    }),
    validateCode: builder.mutation<validateCodeResponse, validateCodeRequest>({
      query: (code) => ({
        url: '/auth/validateCode',
        method: 'POST',
        body: code,
      }),
    }),
  }),
});

export const { useGenerateCodeMutation , useValidateCodeMutation } = verifyCode;
