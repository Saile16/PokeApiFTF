import { useState } from "react";

interface ErrorState {
  message: string;
  type: "error" | "warning" | "info";
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = (error: any) => {
    if (error.response) {
      // Error de respuesta del servidor
      const message = error.response.data?.message || "An error occurred";
      setError({ message, type: "error" });
    } else if (error.request) {
      // Error de red
      setError({
        message: "Network error. Please check your connection.",
        type: "error",
      });
    } else {
      // Otro tipo de error
      setError({
        message: error.message || "An unexpected error occurred",
        type: "error",
      });
    }
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};
