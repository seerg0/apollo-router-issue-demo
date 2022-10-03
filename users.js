const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const port = 4010;

const users = [
  { id: "user-1", name: "user-1" },
  { id: "user-2", name: "user-2" },
];

const typeDefs = gql(readFileSync("./users.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    allUsers: (_, args, context) => {
      return users;
    },
    user: (_, args, context) => {
      return users.find((u) => u.id == args.id);
    },
  },
  User: {
    userProduct: (reference) => {
      console.log("reference", reference);
      if (reference.id) {
        return {
          __typename: "UserProduct",
          userId: reference.id,
        };
      }
      return null;
    },
  },
};
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Users subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
