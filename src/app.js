import {default as express} from 'express';
import { swaggerSpec, swaggerUi } from './config/swagger.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { router as indexRouter } from './routes/index.js';
const app = express();
app.use(express.json());
app.use(requestLogger);
app.get('/',(req,res)=>{
    res.redirect('/api-docs');
})
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/api',indexRouter);
export default app;