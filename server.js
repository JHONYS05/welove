const path    = require('path');
const express = require('express');
const app     = express();
const connectDB  = require('./config/database');


// Seatting 
app.set('port', process.env.PORT || 3333);

// Stattic files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const server = app.listen(app.get('port'), () => {
    console.log('Server On Port', app.get('port'));
});

// Websocket
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('New Connection', socket.id);
    
    socket.on('chat:message', (data) => {
        io.socket.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

// This is a sample test API key.
const stripe = require("stripe")('pk_test_51ImSOfF00CzDlqlgMWSCJ9psYFWpnWNk9ogdRS8tagnuIQxoslYHiarPLTQb1GVzbX5G6cQjSFDQrPNj8fxbnxpu00dncy1E00');


const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      payment_method_types: [
        "giropay",
        "eps",
        "p24",
        "sofort",
        "sepa_debit",
        "card",
        "bancontact",
        "ideal",
      ],
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
// Connect Database
connectDB();

//Init Middlaware 
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Api Runing'));

// Define Routers
app.use('/api/users', require('./routers/api/users'))
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/posts', require('./routers/api/posts'));
app.use('/api/profile', require('./routers/api/profile'));
