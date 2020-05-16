const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("testing the playstore list", () => {
    it("should return a message from GET /apps with proper query", () => {
        return supertest(app).get("/apps").query({"sort":"app", "genres":"action"}).expect(200);
    });

    it("should return a message from GET /apps with proper query lacking a sort value", () => {
        return supertest(app).get("/apps").query({"genres":"action"}).expect(200);
    });

	it("should require a proper genre value", () => {
        return supertest(app).get("/apps").query({"sort":"app", "genres":"anchovies"}).expect(400, 'Query must be either action, puzzle, strategy, casual, arcade, or card');
    });

	it("should apparently explode if not given a genre, whoops", () => {
        return supertest(app).get("/apps").query({"sort":"app"}).expect(500);
    });

	it("should require a proper sort value when supplied any value", () => {
        return supertest(app).get("/apps").query({"sort":"falaffel", "genres":"action"}).expect(400, 'Sort must be either rating or app');
    });
});
