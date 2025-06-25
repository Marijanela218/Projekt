import express from 'express';
import sequelize from './config/db.js';
import receptiRoutes from './routes/receptiRoutes.js';
import { swaggerUi, swaggerSpec } from './swagger/swagger.js';
import cors from 'cors';


const app = express();
app.use(cors());


app.use(express.json()); //omogucava da cita podatke u JSON formatu req.body
app.use(express.urlencoded({ extended: true })); //omogucava da cita podatke u URL kodiranom formatu  naziv_recepta=Palačinke&opis=Brze+i+jednostavne 
app.use('/recepti', receptiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


async function startServer() {
try {
    await sequelize.authenticate();
    console.log('Uspješno spojen na bazu.');
    await sequelize.sync();
    
app.listen(5000, () => {
    console.log('Pokrenuta aplikacija na portu 5000.');
});

} catch (error) {
    console.error('Ne mogu se spojiti na bazu:', error);
}
}
startServer();