const {
  // createUser,
  // createLogin,
  // signIn,
  // getLogin,
  // getUser,

  // getUserById,
  // updateUser,
  // deleteUser,
  // login,
  assignCities,
  assignRoutes,
  assignRouteStages,
  assignCitiesInStages,

  registerEmployee,
  verifyEmployee,
  rejectEmployee,
  registerBus,
  signIn,
  adminSignIn,
  assignBuses,

  getCities,
  getRoutes,
  getRouteStages,
  getCitiesInStages,
  getBuses,
  getEmployees,
  getBusAssignments,

  getPendingEmployees,
} = require("./user.controller");

const { verifyToken } = require("../../auth/token_validation");
const router = require("express").Router();

// router.post("/", verifyToken, createUser);
// router.get("/", verifyToken, getUser);
// router.get("/:id", verifyToken, getUserById);
// router.patch("/", verifyToken, updateUser);
// router.delete("/", verifyToken, deleteUser);
// router.post("/login", login);
// router.post("/createLogin", createLogin);
// router.get("/createLogin", getLogin);
router.post("/cities", assignCities);
router.post("/routes", assignRoutes);
router.post("/stages", assignRouteStages);
router.post("/citiesinstages", assignCitiesInStages);
router.post("/signin", signIn);
router.post("/admin", adminSignIn);

router.post("/registerEmployee", registerEmployee);
router.patch("/verify/:id", verifyEmployee);
router.delete("/reject/:id", rejectEmployee);

router.post("/registerBus", registerBus);
router.post("/assignBus", assignBuses);

router.get("/cities", getCities);
router.get("/routes", getRoutes);
router.get("/routestages", getRouteStages);
router.get("/citiesinstages", getCitiesInStages);
router.get("/buses", getBuses);
router.get("/employees", getEmployees);
router.get("/busassignments", getBusAssignments);

router.get("/pendingEmployees", getPendingEmployees);
module.exports = router;
