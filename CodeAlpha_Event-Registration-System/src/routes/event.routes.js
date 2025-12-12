const express = require("express");
const router = express.Router();
const { 
    createEvent, 
    getEvents, 
    getEvent, 
    updateEvent, 
    deleteEvent 
} = require("../controllers/event.controller");

const authenticate = require("../middleware/auth");

router.post("/", authenticate, (req, res) => {
    if (!req.user.isAdmin) 
        return res.status(403).json({ message: "Admin only" });
    createEvent(req, res);
});

router.put("/:id", authenticate, (req, res) => {
    if (!req.user.isAdmin)
        return res.status(403).json({ message: "Admin only" });
    updateEvent(req, res);
});

router.delete("/:id", authenticate, (req, res) => {
    if (!req.user.isAdmin)
        return res.status(403).json({ message: "Admin only" });
    deleteEvent(req, res);
});

router.get("/", getEvents);
router.get("/:id", getEvent);

module.exports = router;


