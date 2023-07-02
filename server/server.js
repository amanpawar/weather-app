import app from './app.js'
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

app.listen(process.env.BE_PORT, () => console.log(`listening on port ${process.env.BE_PORT}`))