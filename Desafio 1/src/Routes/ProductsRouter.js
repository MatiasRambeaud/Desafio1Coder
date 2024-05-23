import { Router } from "express";
import ProductManager from "../Managers/ProductsManager.js";

const productManager = new ProductManager();


const router = Router();

router.get("/",(req,res)=>{
    const data = productManager.getProducts();
    if(!data){
        res.status(404).send("No products found")
    }
    else{
        res.send(data);
    }
})

router.get("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    if(!pid){
        res.status(400).send("Invalid information")
    }
    else{
        const data = productManager.getProductsByID(pid);
        if(!data){
            res.status(404).send("Product not found")
        }else{
            res.send(data);
        }
    }
})

router.post("/",(req,res)=>{
    const productnew = req.body;

    if(!productnew.title||!productnew.description||!productnew.code||!productnew.category||!productnew.price){
        res.status(400).send("Information missing");
    }else{
        try{
            productManager.addProducts(productnew);
            res.send("Added product")
        }catch{
            res.status(500).send("Error, product not created")
        }
    }
})

router.put("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    const data = req.body;
    if(!pid){
        res.status(400).send("Invalid information")
    }else{
        if(!data){
            res.status(400).send("Values missing")
        }else{
            try{
                productManager.updateProducts(pid,data);
            }catch{
                res.status(500).send("Couldnt modify")
            }
            res.send("Product modified")
        }
    }

})

router.delete("/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    if(!pid){
        res.status(400).send("Invalid information")
    }else{
        try{
            productManager.deleteProducts(pid);
        }catch{
            res.status(500).send("Error, product not created")
        }
    }
})

export default router;