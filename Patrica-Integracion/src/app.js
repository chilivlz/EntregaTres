
import express from "express";
import handlesbars from "express-handlebars";
import { Server } from "socket.io";
import { cartsRouter } from "./routes/carts.router.js";
import { productManagerRouter } from "./routes/products.router.js";
import {routerRealTime} from "./routes/realtimeRouter.js";

import { __dirname, __filename, connectMongo } from "./utils.js";
import http from 'http'
import morgan from "morgan"
import { routerUser } from "./routes/users.router.js";



const app = express();
const port = 8080;

connectMongo();
const server = http.createServer(app);
export const io = new Server (server);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.engine("handlebars", handlesbars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use( express.static(__dirname +"/public"));
app.use(express.static('./public'));

app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter)
app.use("/", routerRealTime)
app.use("/api/users", routerUser)



app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

io.on('connection', (socket)=> {
  console.log('Socket Connection On!!');
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});









