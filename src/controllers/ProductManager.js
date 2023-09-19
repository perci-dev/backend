import { promises as fs } from 'fs'
import { nanoid } from 'nanoid';
class ProductManager {
    thumbnails = [];
    constructor(title, price, description, code, estatus, stock, category, thumbnails) {
        this.path = "./src/models/products.json";
        this.title = title;
        this.price = price;
        this.description = description;
        this.code = code;
        this.estatus = estatus;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }

    readProducts = async () =>{
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProducts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product)) 
    }

    exist = async (id) =>{
        let products = await this.readProducts()
        return products.find(prod => prod.id === id) 
    }
    addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto agregado"
    };

    getProducts = async () =>{
        return await this.readProducts()
    };
    getProductsById = async (id) =>{
        let productById = await this.exist(id)
        return !productById ? "producto no encntrado ": productById
        
    };
       
    updateProducts = async (id, product) =>{
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        await this.deleteProducts(id)
        let productsOld = await this.readProducts()
        let products = [{...product, id : id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto actualizado"
    }


    deleteProducts = async  (id) =>{
        let products = await this.readProducts()
        let existProducts = products.some(prod => prod.id===id)
        if (existProducts){
            let filterProduct = products.filter(prod => prod.id!=id)
            await this.writeProducts(filterProduct)
            return "producto eliminado"
        }
        return "producto no encontrado o no existe para eliminar "
    }

}

export default ProductManager

