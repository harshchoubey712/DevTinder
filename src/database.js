const { MongoClient } = require("mongodb");

// Replace with your actual MongoDB connection string
const url = "mongodb://harshchoubey712:mXbnTNgcHAfDzKM6@ac-zggtaag-shard-00-00.zowkghs.mongodb.net:27017,ac-zggtaag-shard-00-01.zowkghs.mongodb.net:27017,ac-zggtaag-shard-00-02.zowkghs.mongodb.net:27017/?replicaSet=atlas-92z3cp-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=NamasteNode";

const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("User");

    // Insert data
    const data = [
      {
        firstname: "Deepika",
        lastname: "Padukone",
        city: "Mumbai",
        phoneNumber: "9876543210",
      },
    ];

    const insertResult = await collection.insertMany(data);
    console.log("Inserted documents =>", insertResult);

    // Read inserted data
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
