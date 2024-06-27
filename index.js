const cors = require('cors');
const routes = require('./routeS/router');
const express = require('express');

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
