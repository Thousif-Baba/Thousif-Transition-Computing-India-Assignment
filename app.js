const express = require("express");
const axios = require("axios");
const checklistRules = require("./config/checklistRules");

const app = express();

app.use(express.static("public"));

app.get("/checklist", async (req, res) => {
    try {
        const apiUrl = "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";
        const response = await axios.get(apiUrl);
        const data = response.data;

        const results = checklistRules.map((rule) => ({
            id: rule.id,
            name: rule.name,
            status: rule.condition(data) ? "Passed" : "Failed",
        }));

        res.json(results);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch application data." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
