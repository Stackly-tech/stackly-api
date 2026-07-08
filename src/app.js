import {default as express} from 'express';
import { swaggerSpec, swaggerUi } from './config/swagger.js';
import { router as swaggerRouter } from './routes/swagger.js';
const app = express();
app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/',swaggerRouter);
export default app;