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
      "INSERT INTO petsitter VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.id,
        data.Nombre,
        data.Apellidos,
        data.Email,
        data.Telefono,
        data.PhotoURl,
        data.Birth,
        data.Estado,
      ],
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
      "delete petsitter where id = ?",
      [id],
      function (err, results, fields) {
        if (results.affectedRows === 1) {
          res.status(200).json({ message: "Usuario eliminado correctamente" });
        } else {
          throw new Error("No se pudo eliminar el usuario");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
api.get("/getById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const qry = `SELECT A.*,
      B.nombre AS ciudadNombre,
      C.id AS stateId,
      C.nombre AS estadoNombre
      FROM petsitter A
      JOIN city B ON A.ciudadId = B.id
      JOIN state C ON B.stateId = C.id 
      WHERE A.id = ?`;

    // Use placeholders to prevent SQL injection
    connection.query(qry, [id], function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error interno del servidor" });
      }

      res.send(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
  }
});
api.post("/editar/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body.data);
  const { nombre, apellidos, email, telefono, photoURL, ciudadId } =
    req.body.data;

  try {
    const qry = `UPDATE petsitter SET
    nombre = ?,
    apellidos = ?,
    email = ?,
    telefono = ?,
    photoURL = ?,
    ciudadId = ?
    WHERE id = ?;`;

    // Use placeholders to prevent SQL injection
    connection.query(
      qry,
      [nombre, apellidos, email, telefono, photoURL, ciudadId, id],
      function (err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error interno del servidor" });
        }

        res.send(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
  }
});
api.get("/filtrarEstado/:id", async (req, res) => {
  try {
    const id = req.params.id;
    connection.query(
      `select A.*,
      B.nombre as ciudadNombre,
      C.id as stateId,
      C.nombre as estadoNombre
      from petsitter A
      JOIN city B
      ON A.ciudadId = B.id
      JOIN state c
      ON B.stateId = c.id 
      where C.id = ?`,
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
api.get("/all", (req, res) => {
  try {
    connection.connect();
    connection.query(
      `select A.*,
      B.nombre as ciudadNombre,
      C.id as stateId,
      C.nombre as estadoNombre
      from petsitter A
      JOIN city B
      ON A.ciudadId = B.id
      JOIN state c
      ON B.stateId = c.id;`,
      function (err, results, fields) {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

export default api;
