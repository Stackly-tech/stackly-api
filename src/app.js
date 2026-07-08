import {default as express} from 'express';
import { swaggerSpec, swaggerUi } from './config/swagger.js';
import { router as swaggerRouter } from './routes/swagger.js';
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.redirect('/api-docs');
})
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
export default app;