import logger from "../config/logger.js";
export const requestLogger= (req,res,next)=>{
logger.info({
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode
})
next();
}