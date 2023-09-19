import { Router } from "express";
import CartManager from "../controllers/CartManager.js"

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req, res) =>{
    res.send(await carts.addCart())
})

CartRouter.get("/" ,async (req, res) =>{
    res.send(await carts.readCarts())
})

CartRouter.get("/:id" ,async (req, res) =>{
    let id = req.params.id;
    res.send(await carts.getCartsById(req.params.id));
})

CartRouter.post("/:cid/products/:pid", async (req, res)=>{
    let cartId = req.params.cid;
    let productId = req.params.pid;
    res.send(await carts.addProductInCart(cartId, productId))
})

export default CartRouter;