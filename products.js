const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");

const port = 4011;

// Data sources

const userProducts = [
  {
    productId: "product-1",
    userId: "user-1",
  },
];

// GraphQL
const typeDefs = gql(readFileSync("./products.graphql", { encoding: "utf-8" }));
const resolvers = {
  UserProduct: {
    __resolveReference: (reference) => {
      console.log("reference", reference);
      const userProduct = userProducts.find(
        (up) => up.userId == reference.userId
      );
      if (!userProduct) return null;
      return userProduct;
    },
  },
};
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Products subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
