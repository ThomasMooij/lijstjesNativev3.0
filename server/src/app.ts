import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tummus:tummus@cluster0.cinu8zm.mongodb.net/lijstjesDB');
    console.log('Connected to database');

    const loadedTypeDefsFiles = loadFilesSync(path.join(__dirname, './typeDefs'));
    const loadedResolverFiles = loadFilesSync(path.join(__dirname, './resolvers'));

    const typeDefs = mergeTypeDefs(loadedTypeDefsFiles);
    const resolvers = mergeResolvers(loadedResolverFiles);

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () => console.log(`GraphQL server running on: http://localhost:8000/graphql`));
  } catch (error) {
    console.error(error);
  }
}

connectDB();
