import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import  __dirname from "./utils.js"
import { createServer } from "http"; // Cambio de "http" a "createServer"
import { Server as io } from "socket.io"; // Cambio de "Socket" a "Server"
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { Socket } from "dgram";

const app = express();
const server = createServer(app); // Crear el servidor HTTP

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));

app.use("/", ProductRouter);
app.use("/", CartRouter);

const ioServer = new io(server); // Crear una instancia de Socket.io pasando el servidor HTTP

ioServer.on("connection", (socket) => {
 console.log("cliente conectado");

 socket.on("mensaje", (data) =>{
    console.log("mensaje recibido:" , data)
    io.emit("mensaje", data)
 })

 socket.on("disconnect", ()=>{
    console.log("cliente desconectado")
 })
});

server.listen(PORT, () => {
  console.log(`Servidor Express Puerto : ${PORT}`);
});




  