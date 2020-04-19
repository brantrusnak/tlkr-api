import * as dotenv from 'dotenv';
import app from './Server/App';

if(process.env.NODE_ENV !== 'production'){ 
  let result = dotenv.config();
  if(result.error) {
    throw result.error;
  }
}
app.listen(parseInt(process.env.PORT), process.env.HOST);
