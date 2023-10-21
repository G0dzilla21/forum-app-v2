const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe('Express App Tests', () => {
  it('should return "Hello, MongoDB!" when accessing the root route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello, MongoDB!');
        done();
      });
  });

  it('should have an API route for auth and forum', (done) => {
    chai
      .request(app)
      .get('/api')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // You can add more specific checks if needed
        done();
      });
  });
});

// Close the server after testing
after(() => {
  // Close the server instance
  app.server.close();
});
