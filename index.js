const express = require("express");
const fs = require("fs");
const app = express();
const port = 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/prestamo", (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;


  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect("/error.html");
  }

  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;

 
  const fileName = `data/id_${id}.txt`;
  fs.writeFile(fileName, contenido, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error en el servidor");
    }

   
    res.download(fileName, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al descargar el archivo");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
