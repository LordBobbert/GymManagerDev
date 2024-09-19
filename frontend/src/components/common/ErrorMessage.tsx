// File: components/ErrorMessage.tsx

interface ErrorMessageProps {
    message: string;
  }
  
  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <p style={{ color: 'red' }}>{message}</p>;
  };
  
  export default ErrorMessage;
  