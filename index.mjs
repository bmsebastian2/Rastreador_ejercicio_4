import express from "express";
const app = express();
import cors from "cors";
import * as url from "url";
import dotenv from "dotenv";
dotenv.config();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
