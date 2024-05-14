export class StatusCodeError extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
      // This line is needed to restore the correct prototype chain. 
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }