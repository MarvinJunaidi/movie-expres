import express from "express"
import * as movieController from "../controller/movieController.js"
import * as userContoller from "../controller/userController.js"
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js"

const api = express.Router()

api.post("/singin", userContoller.signIn);
api.post("/signup", userContoller.signUp);

api.get("/movie",authenticateTokenMiddleware, movieController.movie)
api.get("/movie/:id", authenticateTokenMiddleware, movieController.detailMovie);
api.post("/movie", authenticateTokenMiddleware, movieController.addNewMovie);
api.put("/movie/:id", authenticateTokenMiddleware, movieController.updateMovie);
api.delete("/movie/:id", authenticateTokenMiddleware, movieController.deleteMovie);

export default api 