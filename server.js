const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// 中间件
app.use(express.static('public'));
app.use(bodyParser.json());

// 获取数据
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});

// 保存数据
app.post('/api/save', (req, res) => {
    const newData = JSON.stringify(req.body, null, 2);
    
    fs.writeFile(DATA_FILE, newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
