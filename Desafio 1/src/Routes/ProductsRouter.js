import { Router } from "express";
import ProductManager from "../Managers/ProductsManager.js";

const productManager = new ProductManager();


const router = Router();

router.get("/",(req,res)=>{
    const data = productManager.getProducts();
    if(!data){
        res.status(404).send("No se encontraron productos")
    }
    else{
        res.send(data);
    }
})

router.get("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    if(!pid){
        res.status(400).send("Informacion invalida")
    }
    else{
        const data = productManager.getProductsByID(pid);
        if(!data){
            res.status(404).send("No se encontró el producto")
        }else{
            res.send(data);
        }
    }
})

router.post("/",(req,res)=>{
    const productnew = req.body;

    if(!productnew.title||!productnew.description||!productnew.code||!productnew.category||!productnew.price){
        res.status(400).send("Faltan datos para generar el producto");
    }else{
        try{
            productManager.addProducts(productnew);
            res.send("Producto añadido")
        }catch{
            res.status(500).send("No se pudo crear el producto")
        }
    }
})

router.put("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    const data = req.body;
    if(!pid){
        res.status(400).send("Informacion invalida")
    }else{
        if(!data){
            res.status(400).send("Falta informacion del producto")
        }else{
            try{
                productManager.updateProducts(pid,data);
            }catch{
                res.status(500).send("No se pudo modificar")
            }
            res.send("Producto modificado")
        }
    }

})

router.delete("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    if(!pid){
        res.status(400).send("Informacion invalida")
    }else{
        try{
            productManager.deleteProducts(pid);
        }catch{
            res.status(500).send("No se pudo eliminar")
        }
    }
})

export default router;