const messageError = 'Operation failed';

class OperationError extends Error {
  message = 'Operation failed';
}
class InvalitError extends Error {
  message = 'Invalid input';
}

export { OperationError, InvalitError };
