const chakram = require('chakram'),
    expect = chakram.expect,
    User = require('../models/user'),
    tokenForUser = require('../helpers/token_for_user');

describe("Index Route", () => {

    it("should deny access to unauthenticated users", () => {
        const response = chakram.get("http://localhost:3090/");
        return expect(response).to.have.status(401);
    });

    it("should allow access to authenticated users", () => {
        const user = new User({
          email: "jameswest@example.com",
          password: "password"
        });

        user.save(err => {
          if(err) console.log(err);

          const response = chakram.get("http://localhost:3090/",{
            'headers':{
              'content-type': 'application/json',
              'authorization': tokenForUser(user)
            }
          });

          return expect(response).to.have.status(200);
        });

    });
});
