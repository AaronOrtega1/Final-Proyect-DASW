const router = require("express").Router();
const { Comment } = require("../db/comments.js");

const nanoid = require("nanoid");


router.get("/", async(req, res) => {
    let filter  = {};
    let {codigo, autor, fecha, pagina, limite} = req.query;

    if(codigo) filter.codigo = new RegExp(codigo, "i");
    if(autor) filter.autor = new RegExp(autor, "i");
    if(fecha) filter.fecha = fecha;

    if(!pagina) pagina = 1;
    if(!limite) limite = 6;
    if(pagina < 1) pagina = 1;

    let finalPag = parseInt(limite);
    let comments = await Comment.getComments(filter, pagina, finalPag);

    res.status(200).send(comments);
});

router.post("/", async(req, res) => {
    let commentData = req.body;

    let newComment = {
        codigo: nanoid.nanoid(),
        autor: commentData.autor,
        fecha: commentData.fecha,
        mensaje: commentData.mensaje
    }

    let comment = await Comment.createComment(newComment);
    res.status(201).send(comment);
});

router.put("/:codigo", async(req, res) => {
    
        let {codigo} = req.params;
        let newData = req.body;
    
        let updatedComment = await Comment.updateComment(codigo, newData);
    
        res.status(200).send(updatedComment);

});

router.delete("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let deletedComment = await Comment.deleteComment(codigo);
    res.status(200).send(deletedComment);
});

router.get("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let comment = await Comment.getCommentById(codigo);
    res.status(200).send(comment);
});

module.exports = router;
