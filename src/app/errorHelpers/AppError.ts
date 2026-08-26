class AppError extends Error {
      public statusCode: number;

      constructor(statusCode: number, message: string, stack?: "") {
            super(message);  // Error("my error message")
            this.statusCode = statusCode;

            stack
                  ? this.stack = stack
                  : Error.captureStackTrace(this, this.constructor);
      }
};

export default AppError;