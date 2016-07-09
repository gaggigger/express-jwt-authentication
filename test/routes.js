var chakram = require('chakram'),
    expect = chakram.expect;

describe("Index Route", function() {
    it("should deny access to unauthenticated users", () => {
        var response = chakram.get("http://localhost:3090/");
        return expect(response).to.have.status(401);
    });
});
