import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import jwt from 'jwt-simple'
import moment from 'moment'
import Usuarios from "./routes/usuarios.js";
import Petsitter from "./routes/petSitters.js";
import PetType from "./routes/petstype.js";
import Reviews from "./routes/reviews.js";

const app = express();
const server = createServer(app);




//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use('/users', Usuarios)
app.use('/petsitter', Petsitter)
app.use('/petType', PetType)
app.use('/reviews', Reviews)

app.get("/", (req, res) => {
    res.send("Api Psyc")
  });
  
  server.listen(5000, () => {
    console.log("Server working!!");
  });
  