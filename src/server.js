import express from 'express';
import { engine } from 'express-handlebars';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger.utils.js';
import { swaggerSetup } from './config/swagger.config.js';
import serviciosRouter from './routes/servicios.router.js';
import reservasRouter from './routes/reservas.router.js';
import usuariosRouter from './routes/usuarios.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import passwordRouter from './routes/password.router.js';
import { __dirname } from './utils/utils.js';
import config from './config/config.js';
import passport from 'passport';
// Sessions -- mongo
// import session from 'express-session';
// import MongoStore from 'connect-mongo';

// Conección con db
import { sequelize, connectDB } from './config/db.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Cookies (temporalmente)
import cookieParser from 'cookie-parser';
app.use(cookieParser());

//Passport
app.use(passport.initialize());

//Handlebars
app.engine(
  'handlebars',
  engine({
    helpers: {
      eq: (a, b) => a === b, // Define el helper `eq`
    },
  })
);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Middleware para configurar res.locals

// Rutas
app.use('/api/servicios', serviciosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/', viewsRouter);
app.use('/api/users', usuariosRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/password', passwordRouter);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
//Swagger

// Conección con db
await connectDB();
app.listen(config.PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${config.PORT}`);
});
