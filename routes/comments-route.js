const router = require("express").Router();
const { Comment } = require("../db/comments.js");

const nanoid = require("nanoid");


router.get("/", async(req, res) => {
    let filter  = {};
    let {codigo, autor, fecha} = req.query;

    if(codigo) filter.codigo = new RegExp(codigo, "i");
    if(autor) filter.autor = new RegExp(autor, "i");
    if(fecha) filter.fecha = fecha;



    let comments = await Comment.getComments(filter);

    res.status(200).send(comments);
});

router.post("/", async(req, res) => {
    let commentData = req.body;
    let date = new Date().toLocaleDateString();

    let newComment = {
        codigo: nanoid.nanoid(),
        idUser: commentData.idUser,
        fecha: date,
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
