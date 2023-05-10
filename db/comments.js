const { mongoose } = require("./connectDB.js");

const commentSchema = mongoose.Schema({
    codigo: {
        type: String,
        unique: true,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    fecha: {
        type: Number,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
});

commentSchema.statics.getComments = async(filters, pagina, limite) => {
    let salto = (pagina - 1) * limite;
    let comments = await Comment.find(filters).skip(salto).limit(limite);
    console.log("Comments: \n" + comments);
    return comments;
}

commentSchema.statics.getCommentById = async(codigo) => {
    let comment = await Comment.findOne({codigo});
    console.log("Comment: \n" + comment);
    return comment;
}

commentSchema.statics.createComment = async(commentData) => {
    let nuevoComment = await Comment(commentData);
    return await nuevoComment.save();
}

commentSchema.statics.updateComment = async(codigo, commentData) => {
    let updateComment = await Comment.findOneAndUpdate({codigo}, {$set: commentData}, {new: true});
    console.log("Updated Comment: \n" + updateComment);
    return updateComment;
}

commentSchema.statics.deleteComment = async(codigo) => {
    let deletedComment = await Comment.findOneAndDelete({codigo});
    console.log("Deleted Comment: \n" + deletedComment);
    return deletedComment;
}


let Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };