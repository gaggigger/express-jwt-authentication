'use strict';
const chakram = require('chakram'),
      expect = chakram.expect,
      User = require('../models/user'),
      tokenForUser = require('../helpers/token_for_user');

describe("Routes", () => {
  let user, payload;

  const url = "http://localhost:3090";

  beforeEach(() => {
    user = new User({
      email: "jameswest@example.com",
      password: "password"
    });

    payload = { body: user };
  });

  describe("/", () => {

    it("should deny access to unauthenticated users", () => {
        const response = chakram.get(url);
        return expect(response).to.have.status(401);
    });

    it("should allow access to authenticated users", () => {

        user.save(err => {
          if(err) console.log(err);

          const response = chakram.get(url, {
            'headers':{
              'content-type': 'application/json',
              'authorization': tokenForUser(this)
            }
          });

          return expect(response).to.have.status(200);
        });

    });
  });

  describe("/signup", () => {
    it("should require email", () => {
      payload.body.email = "";

      const response = chakram.post(`${url}/signup`, payload);

      return expect(response).to.have.json("error", "You must provide email and password");
    });

    it("should require password", () => {
      payload.body.password = "";

      const response = chakram.post(`${url}/signup`, payload);

      return expect(response).to.have.json("error", "You must provide email and password");
    });

    it("should not sign up emails that are already in user", () => {
      user.save(err => {
        if(err) console.log(err);

        const response = chakram.post(`${url}/signup`, payload);

        return expect(response).to.have.json("error", "You must provide email and password");
      });
    });
  });

  describe("/signin", () => {

    it("should return 200 when an unathorized user is accesses it", () => {
      user.save(() => {
        const response = chakram.post(`${url}/signin`, payload);

        return expect(response).to.have.status(200);
      });
    });

    it("should require email", () => {

      user.save(() => {
        payload.body.email = "";

        const response = chakram.post(`${url}/signin`, payload);

        return expect(response).to.have.status(400);
      });
    });

    it("should require password", () => {
      user.save(() => {
        payload.body.password = "";

        const response = chakram.post(`${url}/signin`, payload);

        return expect(response).to.have.status(400);
      });
    });

    it("should deny a wrong email", () => {
      user.save(() => {
        payload.body.password = "jameswest1@example.com";

        const response = chakram.post(`${url}/signin`, payload);

        return expect(response).to.have.status(400);
      });
    });

    it("should deny a wrong password", () => {
      user.save(() => {
        payload.body.password = "p@ssword";

        const response = chakram.post("http://localhost:3090/signin", payload);

        return expect(response).to.have.status(400);
      });
    });
  });
});
