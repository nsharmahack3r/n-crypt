import  ErrorHandler from "../utils/ErrorHandler";


function Error(error:any, req:any, res:any, next:any){
  error.statusCode =error.statusCode || 500;
  error.message = error.message || "Internal Server Error";
  //wrong mongoose object id error'
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid:  ${error.path}`;
    console.log(message);
    error = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (error.code == 11000) {
    const message = `This ${Object.keys(error.keyValue)} is already registered with other account`;
    error = new ErrorHandler(message, 400);
  }

 //wrong jwt error
  if (error.name === "JsonWebTokenError") {
    const message = "Your url is invalid. Try again!!!";
    error = new ErrorHandler(message, 400);
  }
 //token expired error
  if (error.name === "TokenExpiredError") {
    const message = "Your url is expired, PLease Try Again ";
    error = new ErrorHandler(message, 400);
  }


  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}


export default Error;

