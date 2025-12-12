const { AppDataSource } = require("../data-source");
const Registration = require("../entities/Registration");
const Event = require("../entities/Event");
const { ObjectId } = require("mongodb");

const regRepo = () => AppDataSource.getMongoRepository(Registration);
const eventRepo = () => AppDataSource.getMongoRepository(Event);

// Utility for resolving string/ObjectId
function resolveId(id) {
    try {
        return { $in: [id, new ObjectId(id)] };
    } catch {
        return id;
    }
}

// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body;

        if (!eventId || !userId) {
            return res.status(400).json({ message: "userId and eventId required" });
        }

        // check if event exists
        const event = await eventRepo().findOne({ where: { _id: resolveId(eventId) } });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // prevent duplicate registrations
        const exists = await regRepo().findOne({
            where: {
                userId,
                eventId
            }
        });

        if (exists) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        // create registration
        const reg = regRepo().create({ userId, eventId });
        const saved = await regRepo().save(reg);

        return res.status(201).json(saved);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// GET MY REGISTRATIONS WITH EVENT DETAILS
exports.getMyRegistrationsWithEvent = async (req, res) => {
    try {
        const userId = req.user.id; 

        // fetch only this user's registrations
        const regs = await regRepo().find({ where: { userId } });

        // fetch all event details
        const events = await Promise.all(
            regs.map(async (reg) => {
                const event = await eventRepo().findOneBy({ _id: new ObjectId(reg.eventId) });
                return { ...reg, event };
            })
        );

        return res.json(events);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


// CANCEL REGISTRATION
exports.cancelRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const reg = await regRepo().findOne({
            where: { _id: resolveId(id), userId }
        });

        if (!reg) {
            return res.status(404).json({ message: "Registration not found or you are not allowed to cancel it" });
        }

        await regRepo().delete({ _id: reg._id });

        return res.json({ message: "Registration cancelled" });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Invalid ID or server error" });
    }
};
