import 'dotenv/config';
import {default as app} from './app.js';
import logger from './config/logger.js';
const PORT = process.env.PORT;
app.listen(PORT,()=>{
logger.info(`Server started on port ${PORT}`);
});