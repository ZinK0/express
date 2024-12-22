// Error Handler
const errorHandler = (err, req, res, next) => {
  if(err.status){
    res.status(err.status).json({
      message: err.message
    });
  } else {
    res.status(404).json({
      message: "Not Found"
    });
  }
};

export default errorHandler;
