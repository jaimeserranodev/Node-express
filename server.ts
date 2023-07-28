import express from 'express';
import BookingRouter from './src/routes/BookingRoutes';

const app = express();

app.use(express.json());

// Configurar las rutas usando el enrutador BookingRouter
app.use('/api/bookings', BookingRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});