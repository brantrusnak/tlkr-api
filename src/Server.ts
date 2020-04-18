import * as dotenv from 'dotenv';
import app from './Server/App';

if(process.env.NODE_ENV !== 'production'){ 
  let result = dotenv.config();
  if(result.error) {
    throw result.error;
  }
}
app.listen(parseInt(process.env.NODE_PORT), process.env.NODE_HOST);
