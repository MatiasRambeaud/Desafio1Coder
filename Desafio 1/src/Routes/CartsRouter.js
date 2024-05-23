import { Router } from "express";
import CartsManager from "../Managers/CartsManager.js";

const cartsManager = new CartsManager();


const router = Router();

router.get("/:cid",(req,res)=>{
    const cid = parseInt(req.params.cid);
    if(!cid){
        res.status(400).send("Informacion invalida")
    }else{
        const data = cartsManager.getCart(cid);
        if(!data){
            res.status(404).send("No se encontró el carrito")
        }else{
            res.send(data);
        }
    }

})

router.post("/",(req,res)=>{
    try{
        cartsManager.addCart();
    }catch{
        res.status(500).send("error al crear el carrito");
    }
})

router.post("/:cid/product/:pid",(req,res)=>{
    const pid = parseInt(req.params.pid);
    const cid = parseInt(req.params.cid);
    if(!cid||!pid){
        res.status(400).send("Informacion invalida")
    }else{
        try{
            cartsManager.addProduct(cid,pid);
        }catch{
            res.status(404).send("Valores incorrectos")
        }
    }
})

export default router;