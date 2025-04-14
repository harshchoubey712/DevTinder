const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    // "mongodb://harshchoubey712:mXbnTNgcHAfDzKM6@ac-zggtaag-shard-00-00.zowkghs.mongodb.net:27017,ac-zggtaag-shard-00-01.zowkghs.mongodb.net:27017,ac-zggtaag-shard-00-02.zowkghs.mongodb.net:27017/?replicaSet=atlas-92z3cp-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=NamasteNode"
    "mongodb+srv://harshchoubey712:mXbnTNgcHAfDzKM6@namastenode.zowkghs.mongodb.net/devTinder"
  );

  //mongodb+srv://harshchoubey712:mXbnTNgcHAfDzKM6@namastenode.zowkghs.mongodb.net/?appName=NamasteNode
};

module.exports = connectDB;
