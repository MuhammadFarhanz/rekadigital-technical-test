// Custom error class to handle response errors

class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
