import http from 'http';
import express from 'express';
import connect from 'connect'
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './restful-api';
import Socketio from 'socket.io'
import ChatServer from './chat-server'

var app = express();
app.server = http.createServer(app);

// Express session
var cookieParser = express.cookieParser('15cm'),
  sessionStore = new connect.middleware.session.MemoryStore();
var session = express.session({
  secret: '15cm',
  store: sessionStore
})
app.use(cookieParser)
app.use(session)

// Socket io & Express socket.io session
var io = Socketio(app.server)
var sharedSession = SharedSession(session,{ autoSave: true })
io.use(sharedSession)
var chat = new ChatServer(io)
chat.start()

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

// connect to db
db( λ => {

	// internal middleware
	app.use(middleware());

	// api router
	app.use('/api', api());

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
