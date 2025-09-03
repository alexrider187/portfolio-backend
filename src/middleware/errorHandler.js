export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("Error stack:", err.stack);

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message // show actual error in dev
        : statusCode === 500
        ? "Internal Server Error" // hide details in prod
        : err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
