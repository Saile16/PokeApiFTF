import { Request, Response, NextFunction } from "express";

// Clase base para errores de la aplicación
export class AppError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

// Errores específicos
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(400, message);
    this.name = "BadRequestError";
  }
}

// Middleware de manejo de errores
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }

  // Error de MongoDB
  if (err.name === "MongoError" || err.name === "MongoServerError") {
    return res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }

  // Error por defecto
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
