import supertest from "supertest";
import server, { GRAPHQL_PATH } from "../index";

// eslint-disable-next-line jest/no-disabled-tests
describe("Message Resolver", () => {
  test("Correctly Resolves Message Query", () =>
    new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
        {
          messages {
            id
            kind
            description
          }
        }
      `,
        })
        .end((err, res) => {
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));
});
