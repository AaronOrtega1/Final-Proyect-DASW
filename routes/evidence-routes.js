const router = require("express").Router();
const e = require("express");
const { Evidence } = require("../db/evidence.js");

const nanoid = require("nanoid");

router.get("/", async(req, res) => {
    let filter  = {};
    let {codigo, titulo, teacher, fecha,pagina, limite} = req.query;

    if(codigo) filter.codigo = new RegExp(codigo, "i");
    if(titulo) filter.titulo = new RegExp(titulo, "i");
    if(teacher) filter.idUser = new RegExp(teacher, "i");
    if(fecha) filter.fecha = fecha;

    if(!pagina) pagina = 1;
    if(!limite) limite = 6;
    if(pagina < 1) pagina = 1;

    let finalPag = parseInt(limite);

    let evidencias = await Evidence.getEvidencias(filter, pagina, finalPag);
    res.status(200).send(evidencias);

});


router.post("/", async(req, res) => {
    let evidenceData = req.body;
    let date = new Date().toLocaleDateString();

    let newEvidence = {
        codigo: nanoid.nanoid(),
        titulo: evidenceData.titulo,
        urlArchivo: evidenceData.urlArchivo,
        descripcion: evidenceData.descripcion,
        userId: evidenceData.userId,
        comment: evidenceData.comment,
        fecha: date
    }

    let evidence = await Evidence.createEvidencia(newEvidence);
    res.status(201).send(evidence);


});

router.put("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let newData = req.body;

    let updatedEvidence = await Evidence.updateEvidencia(codigo, newData);

    res.status(200).send(updatedEvidence);

});

router.delete("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let deletedEvidence = await Evidence.deleteEvidencia(codigo);
    res.status(200).send(deletedEvidence);
});

router.get("/:codigo", async(req, res) => {
    let {codigo} = req.params;
    let evidence = await Evidence.getEvidenciaById(codigo);
    res.status(200).send(evidence);
});

module.exports = router;

