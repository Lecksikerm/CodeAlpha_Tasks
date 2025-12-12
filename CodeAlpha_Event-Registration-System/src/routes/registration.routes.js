const router = require("express").Router();
const { registerForEvent, cancelRegistration, getMyRegistrationsWithEvent } = require("../controllers/registration.controller");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, registerForEvent);
router.get("/", authenticate, getMyRegistrationsWithEvent);
router.delete("/:id", authenticate, cancelRegistration);

module.exports = router;
