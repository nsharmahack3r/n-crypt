import { ErrorHandler} from "../utils/errorhandler";


class Error{
    static  Errors = (err:any, req:any, res:any, next:any) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message;
  //wrong mongoose object id error'
  if (err.name === "CastError") {
    const message = `${err.path}`;
    console.log(message);
    err = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} `;
    err = new ErrorHandler(message, 400);
  }

 //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Your url is invalid. Try again!!!";
    err = new ErrorHandler(message, 400);
  }
 //token expired error
  if (err.name === "TokenExpiredError") {
    const message = "Your url is expired, PLease Try Again ";
    err = new ErrorHandler(message, 400);
  }
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
}
}

export default Error;

