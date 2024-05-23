import express from "express";
import CartsRouter from "./Routes/CartsRouter.js"
import ProductsRouter from "./Routes/ProductsRouter.js";

const app = express();

app.use(express.json());

app.use("/api/products",ProductsRouter);
app.use("/api/cart",CartsRouter)

app.listen(8080, ()=>console.log("server running."));