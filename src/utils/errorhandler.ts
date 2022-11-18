interface ErrorHandler {
    status?: number; 
    
}
class ErrorHandler extends Error {
    constructor(message:string, status: number) {
      super(message);   
        this.status = status;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export { ErrorHandler };