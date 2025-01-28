 
import {promises as fs} from "fs";


class ProductManager {
    static ultId = 0; 
    constructor(path) {
        this.products = []; 
        this.path = path; 
    }

    async addProduct({title, description, price, img, code, stock}) {

        const arrayProductos = await this.leerArchivo(); 

        if(!title || !description || !price || !img || !code || !stock ) {
            console.log("Todos los campos son obligatorios"); 
            return; 
        }

        if(arrayProductos.some(item => item.code === code)) {
            console.log("El codigo debe ser unico"); 
            return; 
        }

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title, 
            description,
            price,
            img,
            code,
            stock
        }
 
        arrayProductos.push(nuevoProducto); 

        await this.guardarArchivo(arrayProductos); 
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo(); 
        return arrayProductos;
    }

    async getProductById(id) {
 
        const arrayProductos = await this.leerArchivo();
        const producto = arrayProductos.find(item => item.id === id);

        if(!producto) {
            return "Not Found"; 
        } else {
            return producto; 
        }
    } 

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo"); 
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta); 
            return arrayProductos; 
        } catch (error) {
            console.log("Tenemos un error al leer el archivo"); 
        }
    }
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products[index];
            this.products.splice(index, 1);
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }
}
 
export default ProductManager; 