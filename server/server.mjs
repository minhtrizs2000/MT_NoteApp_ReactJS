import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';


import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';

import './firebaseConfig.js'
import { getAuth } from 'firebase-admin/auth'
import 'dotenv/config';

const app = express();
const httpServer = http.createServer(app);


// Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ez1g7f6.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/',
});
// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
            return {
                async drainServer() {
                await serverCleanup.dispose();
                },
            };
            },
        },
    ]
});

await server.start();

// authorization JWT middleware: block all request from client and verify token in header if accessable or not
const authorizationJWT = async (request, response, next) => {
    const authorizationHeader = request.headers.authorization;

    if(authorizationHeader){
        const accessToken = authorizationHeader.split(' ')[1];

        //getAuth method from firebase
        getAuth().verifyIdToken(accessToken)
        .then((decodedToken) => {
            response.locals.uid = decodedToken.uid;
            next();
        })
        .catch((error) => {
            console.log({ error });
            return response.status(403).json({message: 'Forbidden', error: error});
        });
    } else {
        next();
        // return response.status(401).json({message: 'Unauthorized'});
    }
}

app.use(
    cors(), 
    authorizationJWT, 
    bodyParser.json(), 
    expressMiddleware(server, {
        context: async ({req: request, res: response}) => {
            //default obj is {req, res} because of using Destructuring
            //pass context variable through express middleware for all resolver
            return { uid: response.locals.uid };
        },
    })
);

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async ()=> {
    console.log('Connected to DB - MongoDB');
    //Start server
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`☢️  Server is running at http://localhost:${PORT}`);
});

