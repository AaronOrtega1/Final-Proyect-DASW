let dbConfig = {
  user: "cg727976",
  password: "BlurryFace001",
  dbName: 'taskDB',
  dbURL: function(){
    return `mongodb+srv://${this.user}:${this.password}@cluster0.vn6sprx.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
  }
}

module.exports = dbConfig;