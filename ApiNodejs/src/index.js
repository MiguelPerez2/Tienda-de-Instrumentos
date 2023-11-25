import express from 'express';
import { PORT, Config_Core } from './config/config.js';

import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import cors from 'cors'

const app=express();

//politicas cros
app.use(cors(Config_Core.application.cors.server));

app.use(express.json());
app.use(authRoutes,resourceRoutes);

app.use((rep,res,next)=>{
    res.status(404).json({message:'Ruta Invalida'});
})

app.listen(PORT);