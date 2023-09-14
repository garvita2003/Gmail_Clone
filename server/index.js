import express from 'express';
import DBConnection from './database/db.js';
import routes from './routes/route.js';
import cors from 'cors';

const app = express();

app.use(cors());
//to tell how to handle api
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/',routes);

const PORT = 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
