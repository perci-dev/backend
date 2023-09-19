import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
const ProductRouter = Router();
const product = new ProductManager();

ProductRouter.get("/", async(req, res) =>{
    res.render("home", {
        title: "websocket/ Handlebars",
        productos : await product.getProducts()
    })
})


ProductRouter.get("/:id", async(req, res) =>{
    let prod = await product.getProductsById(req.params.id)
    res.render("prod", {
        title: "websocket/ Handlebars",
        productos : prod
    })
})

/*ProductRouter.get("/", async(req, res) =>{
    res.send(await product.getProducts());
});

ProductRouter.get("/:id", async(req, res) =>{
    let id = req.params.id;
    res.send(await product.getProductsById(id));
});*/

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body;
    
    // Validamos que se proporcionen todos los campos
    if (
        !newProduct.title ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.estatus ||
        !newProduct.stock ||
        !newProduct.category ) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos .' });
    }

    const result = await product.addProducts(newProduct); // Asumiendo que writeProducts devuelve algo.
    res.send(result); // Envía la respuesta al cliente.
});

ProductRouter.delete("/:id", async(req, res) =>{
    let id = req.params.id;
    res.send(await product.deleteProducts(id));
});


ProductRouter.put("/:id", async(req, res) =>{
    let id = req.params.id;
    let updateProduct=req.body;
    res.send(await product.updateProducts(id, updateProduct));
});


export default ProductRouter;