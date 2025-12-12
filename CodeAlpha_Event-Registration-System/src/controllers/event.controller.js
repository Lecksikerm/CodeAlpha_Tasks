const { AppDataSource } = require("../data-source");
const Event = require("../entities/Event");
const { ObjectId } = require("mongodb");

const eventRepo = () => AppDataSource.getMongoRepository(Event);


function resolveId(id) {
    try {
        return { $in: [id, new ObjectId(id)] };
    } catch {
        return id;
    }
}

// CREATE EVENT
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, maxAttendees } = req.body;

        const newEvent = eventRepo().create({
            title,
            description,
            date: new Date(date),
            location,
            maxAttendees
        });

        const saved = await eventRepo().save(newEvent);
        return res.status(201).json(saved);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getEvents = async (req, res) => {
    try {
        // Read query params: ?page=1&limit=10
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const eventRepository = eventRepo();

        // Fetch total count
        const total = await eventRepository.count();

        // Fetch paginated events
        const events = await eventRepository.find({
            skip,
            take: limit,
            order: { date: "ASC" }
        });

        res.json({
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalEvents: total,
            events
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET SINGLE EVENT
exports.getEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventRepo().findOne({ where: { _id: resolveId(id) } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const id = req.params.id;
        const repo = eventRepo();

        const event = await repo.findOne({ where: { _id: resolveId(id) } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        Object.assign(event, req.body);

        const updated = await repo.save(event);

        return res.json({
            message: "Event updated successfully",
            event: updated
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;

        const event = await eventRepo().findOne({
            where: { _id: resolveId(id) }
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await eventRepo().delete(event);

        return res.json({ message: "Event deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};




