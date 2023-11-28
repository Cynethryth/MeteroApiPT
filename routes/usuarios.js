import express from "express";
import connection from "../connection.js";
const api = express.Router();
import jwt from "jwt-simple";
import moment from "moment";

api.get("/", (req, res) => {
  res.send("usuarios");
});

api.get("/all", (req, res) => {
  try {
    connection.connect();
    connection.query("SELECT * FROM user", function (err, results, fields) {
      res.send(results);
    });
  } catch (error) {
    console.error(error);
  }
});
api.post("/login", (req, res) => {
  async function executer() {
    const data = req.body.data;
    try {
      connection.query(
        `SELECT * FROM user WHERE email = '${data.Email}'`,
        (err, rows, fields) => {
          if (rows.length == 0) {
            res.status(403).json({respuesta:"email incorrecto o inexistente"});
            // throw new Error("email incorrecto o inexistente");
          } else {
              const user = rows[0];
              if (user.Password == data.Password) {
                const usuario = {
                  id: user.id,
                  nombre: user.Nombre,
                  apellidos: user.Apellidos,
                  direccion: user.Direccion,
                  telefono: user.Telefono,
                  iat: moment().unix(),
                  exp: moment(10, "days").unix(),
                };
                //Escribi la palabra secreta en codigo duro para apreciarla, pero de normal
                //seria escribirla por .env para tenerla como una variable de entorno
                const coded = jwt.encode(usuario, "PalabraSecreta");
                res.status(200).json({ usuario: coded });
              }
            }
        }
      );
    } catch (error) {
      console.error(error)

    }
  }

  executer();
});
api.post("/register", async (req, res) => {
  try {
    const { data } = req.body;
    connection.query(
      "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.id,
        data.Nombre,
        data.Apellidos,
        data.Email,
        data.Password,
        data.Direccion,
        data.Telefono,
      ],
      function (err, results, fields) {
        if (results.affectedRows === 1) {
          const usuario = {
            id: data.id,
            nombre: data.Nombre,
            apellidos: data.Apellidos,
            direccion: data.Direccion,
            telefono: data.Telefono,
            iat: moment().unix(),
            exp: moment(10, "days").unix(),
          };
          //Escribi la palabra secreta en codigo duro para apreciarla, pero de normal
          //seria escribirla por .env para tenerla como una variable de entorno
          const coded = jwt.encode(usuario, "PalabraSecreta");
          res.status(200).json({ usuario: coded });
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

api.post("/postState", async (req, res) => {
  try {
    const { data } = req.body;
    connection.query(
      "INSERT INTO state VALUES (?, ?)",
      [
        data.id,
        data.nombre,
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
api.post("/postCity", async (req, res) => {
  try {
    const { data } = req.body;
    connection.query(
      "INSERT INTO city VALUES (?, ?, ?)",
      [
        data.id,
        data.nombre,
        data.estadoid,
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

export default api;
