import express from "express";
import { engine  } from "express-handlebars"; // Asumiendo que quieres usar Handlebars
import * as path from "path";
import __dirname from "./utils.js";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";


const app = express();
const PORT = 4000;

app.use(express.json()); // Debes llamar a la función express.json() para utilizar el middleware.
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//archivos estaticos 
app.use("/", express.static(__dirname + "/public"))




app.use("/", ProductRouter)
app.use("/", CartRouter)


app.listen(PORT, () => {
    console.log(`Servidor Express Puerto : ${PORT}`);
});