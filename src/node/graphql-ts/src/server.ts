import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import BeerResolver from "./resolvers/BeerResolver";

(async () => {
  const typeDefs = await importSchema("**/*.graphql");
  console.log("typeDefs", typeDefs);

  const resolvers = {
    Query: {
        ...BeerResolver.Query
    },
    ...BeerResolver.Type
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
  );
})();
