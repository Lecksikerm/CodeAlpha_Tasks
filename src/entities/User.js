const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        _id: {
            primary: true,
            type: "objectId",
            objectId: true,
            generated: false
        },
        name: { type: "string" },
        email: { type: "string", unique: true },
        password: { type: "string" },
        isAdmin: { type: "boolean", default: false },
        createdAt: { type: "date", default: () => new Date() }
    }
});

