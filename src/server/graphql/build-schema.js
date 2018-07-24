import fs from 'fs';
import typeDefs from './schema';

const stream = fs.createWriteStream(`${__dirname}/generated/schema.graphql`);

stream.once('open', () => {
  typeDefs.forEach(def => stream.write(def));
  stream.end();
});
