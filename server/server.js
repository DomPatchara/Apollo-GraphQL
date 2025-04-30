import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Mock Data
const users = [
  {
    id: "1",
    name: "Alice",
    age: 28,
    isMarried: false,
  },
  {
    id: "2",
    name: "Bob",
    age: 34,
    isMarried: true,
  },
  {
    id: "3",
    name: "Charlie",
    age: 22,
    isMarried: false,
  },
];

// 0 // Server setup
    // npm init -yes; npm pkg set type=module    (-yes auto yes)
   //  npm install @apollo/server graphql (ฝั่ง folder server)
   //  npm install @apollo/client graphql (ฝั่ง folder client)


// 1 // set GraphQL Schema โดยการกำหนด Type Definition ===> RooT Types แบ่งเป็น 2 อันหลักๆคือ [1.] Query และ [2.] Mutation
const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    isMarried: Boolean!      
  }
`;

// 2 // set "resolvers" คือ function handle fetching เชื่อมต่อระหว่าง GraphQL Schema (types และ fields) กับ ข้อมูลจริงๆอย่าง Database, API or Static data 
const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
    },
  },
};

// 3 // Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4 // Start Server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running on port at : ${url}`);


