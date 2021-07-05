const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send("Hello");
});

const PORT = 4040;
app.listen(PORT, ()=>{
  console.log(`App listening at http://localhost:${PORT}`);
})