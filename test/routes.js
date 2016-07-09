var chakram = require('chakram'),
    expect = chakram.expect;

describe("Index Route", function() {


    it("should deny access to unauthenticated users", () => {
        var response = chakram.get("http://localhost:3090/");
        return expect(response).to.have.status(401);
    });

    it("should allow access to authenticated users", () => {
        var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NzdlZTc2ZGFkOTU3ZGJjMDNjYzNjZGEiLCJpYXQiOjE0NjgwOTcyMzMxMjd9.C3eEpZ2WID3Y_nZqfNRIo6cinIYtMS2b0EYzk0KOEPk";
        var response = chakram.get("http://localhost:3090/",{
          headers:{
            'content-type': 'application/json',
            'authorization': accessToken
          }
        });
        return expect(response).to.have.status(200);
    });
});
