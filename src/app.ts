import express from 'express';
import serverless from 'serverless-http';
import 'dotenv/config';
import passport from 'passport';

import BookingRouter from './routes/BookingRouter';
import RoomRouter from './routes/RoomRouter';
import LoginRouter from './controllers/login';
import ContactRouter from './routes/ContactRouter';
import UserRouter from './routes/UserRouter';
import "./middleware/auth";


const app = express();

app.use(express.json());

// Configurar la ruta raíz
app.get('/info', (req, res) => {
  res.send('¡Hola! Bienvenido a MIRANDA.');
});


app.use('/login', LoginRouter)

  // Configurar las rutas usando el enrutador BookingRouter
  app.use('/bookings', passport.authenticate('jwt', { session: false }), BookingRouter);

  // Configurar las rutas usando el enrutador RoomRouter
  app.use('/rooms', passport.authenticate('jwt', { session: false }), RoomRouter);

  // Configurar las rutas usando el enrutador ContactRouter
  app.use('/contact', passport.authenticate('jwt', { session: false }), ContactRouter);

  // Configurar las rutas usando el enrutador UserRouter
  app.use('/users', passport.authenticate('jwt', { session: false }), UserRouter);

const port = 3000;
export const server = app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
export default server;

export const handler = serverless(app);