import { promises as fs } from 'fs'
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () =>{
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }

    writeCarts = async (cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart)) 
    }

    exist = async (id) =>{
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id) 
    }

    getCartsById = async (id) =>{
        let cartById = await this.exist(id)
        return !cartById ? "carrito no encntrado ": cartById
        
    };

    addCart = async () =>{
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartConcat = [{id: id, products :[]}, ...cartsOld]
        await this.writeCarts(cartConcat)
        return "Carrito agregado"
    };

    addProductInCart = async (cartId, productId) =>{
        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"
        let productById = await productAll.exist(productId)
        if(!productById) return "Producto no encontrado"
        let cartAll = await this.readCarts()
        let cartFilter = cartAll.filter(cart => cart.id !=cartId)
        if(cartById.products.some(prod => prod.id === productId))        
        {
            let moreproductInCart = cartById.products.find(prod => prod.id === productId)
            moreproductInCart.cantidad++;
            let cartConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartConcat)
            return "Producto sumado  al carrito"
        }
        cartById.products.push({id:productById.id, cantidad: 1}) 

        let cartConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartConcat)
        return "Producto agregado al carrito"
    }

}

export default CartManager;