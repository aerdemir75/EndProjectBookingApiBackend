const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message:
      err.status === 404
        ? err.message
        : "An error occurred on the server, please double-check your request!",
  });
};

export default errorHandler;
