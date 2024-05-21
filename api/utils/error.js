//custom error creation
export const errorHandler = (errorStatus,message)=>{
    const error=new Error();
    error.errorStatus=errorStatus;
    error.message=message;
    return error;

};