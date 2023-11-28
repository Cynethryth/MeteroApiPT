import express from "express";
import connection from "../connection.js";
const api = express.Router();

api.get("/", (req, res) => {
  res.send("petsitters");
});

api.post("/registrar", async (req, res) => {
  try {
    const { data } = req.body;
    connection.query(
      "INSERT INTO petscan VALUES (?, ?, ?)",
      [data.id, data.sitterId, data.petTypeId],
      function (err, results, fields) {
        if (results.affectedRows === 1) {
          res.status(200).json({ message: "Usuario creado correctamente" });
        } else {
          throw new Error("No se pudo crear el usuario");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
api.get("/eliminar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    connection.query(
      "delete petcan where id = ?",
      [id],
      function (err, results, fields) {
        if (results.affectedRows === 1) {
          res
            .status(200)
            .json({ message: "Tipo de mascota eliminado correctamente" });
        } else {
          throw new Error("No se pudo eliminar el tipo de mascota");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
api.get("/getTypes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    connection.query(
      `select A.*,B.descripcion from petscan A 
      Join petstype B
      ON B.id = A.petTypeId
      where sitterId = ?;`,
      [id],
      function (err, results, fields) {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

api.post("/create", async (req, res) => {
  try {
    const { data } = req.body;
    connection.query(
      "INSERT INTO petstype VALUES (?, ?)",
      [data.id, data.nombre],
      function (err, results, fields) {
        if (results.affectedRows === 1) {
          res.status(200).json({ message: "Usuario creado correctamente" });
        } else {
          throw new Error("No se pudo crear el usuario");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default api;
