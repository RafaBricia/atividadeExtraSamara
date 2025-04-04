const express = require('express');

const bodyParser = require("body-parser");
const loginRouter = require('./routes/authRoute.js');
const taskRouter = require('./routes/taskRoute.js');
const db = require("./db/db.js");
const cors = require("cors");


const app = express();
app.use(bodyParser.json()); 
app.use(cors())
app.use("/api", loginRouter);
app.use("/api", taskRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});