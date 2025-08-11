import data from "../data/sampleData.js"

export const getAllDados = (req, res) => {
    console.log("Get all dados chamado")
    res.json(data);
}