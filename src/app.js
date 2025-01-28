import express from "express"; 
const app = express(); 

const PUERTO = 8080;

import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";

                                //Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

                                //Rutas
app.use("/api/products", productRouter); 
app.use("/api/carts", cartRouter); 

                               //Listen
app.listen(PUERTO, () => {
  console.log(`Server iniciado en  http://localhost:${PUERTO}`);
})

app.get('/', (req, res) => {
    res.send('Bienvenido mi servidor (Backend Primera Entrega)');
});