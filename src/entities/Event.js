const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Event",
    tableName: "events",
    columns: {
        _id: {
            primary: true,
            type: "objectId",
            objectId: true
        },
        title: { type: "string" },
        description: { type: "string", nullable: true },
        date: { type: "date" },
        location: { type: "string", nullable: true },
        maxAttendees: { type: "int", nullable: true },
        createdAt: { type: "date", default: () => new Date() }
    }
});
