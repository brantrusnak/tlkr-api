import * as dotenv from 'dotenv';
import app from './src/Server/App';

let result = dotenv.config();
if (result.error) {
  throw result.error;
} else {
  console.log(result.parsed);
  app.listen(
    parseInt(process.env.NODE_PORT),
    process.env.NODE_HOST,
    () => {
      console.log(
        `Started server on port http://${process.env.NODE_HOST}:${
          process.env.NODE_PORT
        }`
      );
    }
  );
}
