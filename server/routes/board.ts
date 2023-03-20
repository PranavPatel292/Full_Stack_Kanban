import { validateBoardId } from "./../middleware/validateBoardId";
import {
  createBoard,
  getAllBoards,
  deleteBoard,
} from "../controllers/boardController";

const router = require("express").Router();

router.get("/", getAllBoards);

router.post("/", createBoard);

// TODO: how to handle update request

router.delete("/", validateBoardId, deleteBoard);

module.exports = router;