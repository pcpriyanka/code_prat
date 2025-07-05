// features/profile/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) =>
  message ? <span style={{ color: '#c00', fontSize: 12 }}>{message}</span> : null;
