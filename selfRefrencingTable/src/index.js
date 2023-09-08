import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/conn.js";
import { Person } from "./model/schema.js";
const app = express();

const PORT = process.env.PORT || 8001;

app.use(express.json());

async function createHierarchy() {
    const ramesh = new Person({ name: 'Ramesh' });
    const gaurav = new Person({ name: 'Gaurav' });
    const shalu = new Person({ name: 'Shalu' });
    const deepu = new Person({ name: 'Deepu' });
    const amit = new Person({ name: 'Amit' });
    const amitKumar = new Person({ name: 'Amit Kumar' });
    const shamLal = new Person({ name: 'Sham Lal' });
    const kapil = new Person({ name: 'Kapil' });
    const pran = new Person({ name: 'Pran' });
  
    ramesh.children.push(gaurav, amit);
    gaurav.children.push(shalu, deepu);
    amitKumar.children.push(shamLal, kapil);
    kapil.children.push(pran);
  
    await ramesh.save();
    await gaurav.save();
    await shalu.save();
    await deepu.save();
    await amit.save();
    await amitKumar.save();
    await shamLal.save();
    await kapil.save();
    await pran.save();
  }
  
  async function displayHierarchy(node, level = 0) {
    const spaces = '  '.repeat(level);
    console.log(spaces + '- ' + node.name);
  
    const children = await Person.find({ _id: { $in: node.children } });
    for (const child of children) {
      await displayHierarchy(child, level + 1);
    }
  }
  
  createHierarchy()
    .then(async () => {
      const root = await Person.findOne({ name: 'Ramesh' });
      console.log('Hierarchy:');
      await displayHierarchy(root);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    });


app.listen(PORT,async() =>{
    console.log(`Server is listening to the port ${PORT}`);
    await connectDB();
});
