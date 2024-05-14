const { Router } = require("express");
const { getUsers, getUsersById, newUser, editUser, authUser, getUsersOrderByGroup, verSistema } = require("../controllers/usuarioController");
const usuarioRoutes = Router();

usuarioRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let usuario;
    if (id == "all") {
      usuario = await getUsers();
    } else {
      usuario = await getUsersById(id);
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

usuarioRoutes.get("/order/byGroup", async (req, res) => {
  try {
    const usuario = await getUsersOrderByGroup();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

usuarioRoutes.post("/", async (req, res) => {
  try {
    const usuario = await newUser(req.body)
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

usuarioRoutes.post("/auth", async (req, res) => {
  try {
    const auth = await authUser(req.body);
    res.status(200).json(auth);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

usuarioRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await editUser(req.body, id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

usuarioRoutes.get("/sistema/ver", async (req, res) => {
  try {
    const usuario = await verSistema();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = usuarioRoutes;
