let dbConfig = {
  user: "antoniorodriguez",
  password: "ilmmcW22",
  dbName: 'daswpfDB',
  dbURL: function(){
    return `mongodb+srv://${this.user}:${this.password}@cluster0.yqauqpu.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
  },
  jwtSecret: "66646"
};

module.exports = dbConfig;
