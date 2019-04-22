const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 8080;
const events = require('./data/events.json')
const chats = require('./data/chats.json')

//call express like a function to create a new server
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});

// Require in and pass the function our app.listen variable. Then start using our IO socket variable to now listen for connections
io = require("socket.io")(server)

io.on('connection', (socket) => {
  console.log(`new connection: ${socket.id}`)

  // This is where socket is listening 'on' the 'start' keyword from the client
  socket.on('start', () => {
    // When this keyword is hit it will run any code in this function
    //  Here we are emitting all current messages saved in the array to a new connection.
    io.emit('receiveNewMessage', chats)
  })

  // This is where our socket is listening for 'sendNewMessage' from the client. It is then taking
  //  the data being sent to it and pushing it to our messageList array and sending that back to all users
  socket.on('sendNewMessage', (msg) => {
    chats.push(msg)
    io.emit('receiveNewMessage', chats)
  })

  // When someone disconnects we are console logging it to see who disconnected.
  socket.on('disconnect', () => console.log(`Client disconnected: ${socket.id}`))
})

app.post('/newEvent', (req, res) => {
  // retrieve new event object from the POST body
  let newEvent = req.body;

  if (req.body) {

    let id = String((Date.now()) + (Math.random().toString(36).slice(2)));

    //grab each value from the post body
    let newSummary = newEvent.summary;
    let newDescription = newEvent.description;

    let newlocation = newEvent.location;

    let newEventStart = newEvent.dateTimeStart;
    let newTimeZone = newEvent.timeZone;
    let newEventEnd = newEvent.dateTimeEnd;

    //create event item
    let event = {
      "id": id,
      "summary": newSummary,
      "description": newDescription,
      "location": newlocation,
      "start": {
        "dateTime": newEventStart,
        "timeZone": newTimeZone
      },
      "end": {
        "dateTime": newEventEnd,
        "timeZone": newTimeZone
      },
      "reminders": {
        "useDefault": false,
        "overrides": [
          { "method": "email", "minutes": 1440 },
          { "method": "popup", "minutes": 10 }
        ]
      }
    }

    //add event to array
    events.push(event);

    //send back json object of events array
    res.json(events);
  }
})

//get array of events
app.get('/events', (req, res) => {
  res.json(events);
})