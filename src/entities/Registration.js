const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Registration",
    tableName: "registrations",
    columns: {
        _id: {
            primary: true,
            type: "objectId",
            objectId: true
        },
        userId: { type: "string" },
        eventId: { type: "string" },
        registeredAt: { type: "date", createDate: true }
    }
});
