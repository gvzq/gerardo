import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pino, { Logger } from "pino";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Structured logger using Pino - JSON in production, pretty print in development
export const logger: Logger =
  process.env.NODE_ENV === "production"
    ? // JSON in production
      pino({ level: "warn" })
    : // Pretty print in development
      pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
        level: "debug",
      });

// Helper function to create child loggers with module identification
export const createLogger = (module: string) => {
  return logger.child({ module });
};
