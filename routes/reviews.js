import express from "express";
const api = express.Router();

import "../mongoDB.js";
import Reviews from "../schemas/reviews.js";

api.get("/", async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

api.post("/create", async (req, res) => {
  const data = req.body.data;
  try {
    const reviews = await Reviews.insertMany([data]);
    res.send(true);
  } catch (error) {
    console.log(error);
  }
});

api.get("/getById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Reviews.find({ petSitterId: id });
    res.send(usuario);
  } catch (error) {
    console.log(error);
  }
});

export default api;
