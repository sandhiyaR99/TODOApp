import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let list = [{ id: 1, value: "WakeUp" }];
let nextId = 2; 

app.get("/todo", (req, res) => {
    res.send({
        status: 200,
        data: list,
    });
});

app.post("/todo", (req, res) => {
    const { value } = req.body;
    const newItem = { id: nextId++, value: value };
    list.push(newItem);
    res.send(true);
});

app.put("/todo/:id", (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const updateindex = list.findIndex(item => item.id === parseInt(id));
    if (updateindex !== -1) {
        list[updateindex].value = value;
        res.send(true);
    }
});

app.delete("/todo/:id", (req, res) => {
    const { id } = req.params;
    const edititem = list.findIndex(item => item.id === parseInt(id));
    if (edititem !== -1) {
        list.splice(edititem, 1);
        res.send(true);
    }
});

app.listen(5000, () => {
    console.log("started");
});
