import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import path from "path";

import { ApolloServer } from "@apollo/server"
import { buildSchema } from "graphql"
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js"
import mergedTypeDefs from "./typeDefs/index.js"

import {connectDb} from "./db/connectDB.js"
import { configurePassport } from "./passport/passportConfig.js";

dotenv.config();
configurePassport();

const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session); 

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
})

store.on("error", (err) => console.log(err));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //this option specifies whether to save the session to the store on every req
    saveUninitialized: false, //this option specifies whether to save uninitialized sessions
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true // prevents css attacks
    },
    store: store, 
  })
)

app.use(passport.initialize());
app.use(passport.session());
 
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
 
await server.start();
 
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/graphql',
  cors({
    origin: "http://localhost:3000",
    credentials: true
  }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req , res}) => buildContext({ req , res }),
  }),
);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
})

// Modified server startup
await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);

connectDb();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);