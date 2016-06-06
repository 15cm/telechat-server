import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import api from './restful-api'
import middleware from './middleware';
import Socketio from 'socket.io'
import ChatServer from './chat-server'

var app = express();
app.server = http.createServer(app);


// Socket io & Express socket.io session
var io = Socketio(app.server)
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
