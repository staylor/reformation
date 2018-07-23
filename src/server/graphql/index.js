import 'dotenv/config';
import express from 'express';
import { CronJob } from 'cron';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import typeDefs from 'server/graphql/schema';
import resolvers from 'server/graphql/resolvers';
import addModelsToContext from './models';
import authenticate from './authenticate';
import createIndexes from './database/indexes';
import youtubeData from './data/youtube';

/* eslint-disable no-console */

const { GRAPHQL_PORT = 8080, MONGO_URL, MONGO_DB } = process.env;

async function startServer() {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
  const db = client.db(MONGO_DB);
  createIndexes(db);

  const ytJob = new CronJob({
    cronTime: '*/15 * * * *',
    onTick: async () => {
      await youtubeData(db);
    },
    timeZone: 'America/New_York',
    start: false,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => addModelsToContext({ db }),
  });

  const app = express();
  server.applyMiddleware({ app, cors: true, bodyParserConfig: true });

  app.use(bodyParser.urlencoded({ extended: true }));

  authenticate(app);

  app.listen({ port: GRAPHQL_PORT }, () => {
    ytJob.start();
    console.log(
      `API Server is now running on http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`
    );
  });
}

startServer()
  .then(() => {
    console.log('All systems go');
  })
  .catch(e => {
    console.error('Uncaught error in startup');
    console.error(e);
    console.trace(e);
  });
