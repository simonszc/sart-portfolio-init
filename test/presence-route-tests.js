'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGOLAB_URI = 'mongodb://localhost/routetest';

const expect = require('chai').expect;
const request = require('superagent');
const Presence = require('../model/presence.js');

require('../server.js');

const url = `http://localhost:${PORT}`;

const examplePresence = {
  name: 'github',
  url: 'http://www.github.com',
  description: 'my github page'
};

describe('testing route /api/presence', function() {
  describe('testing POST requests', function() {
    afterEach( done => {
      if(this.tempPresence) {
        Presence.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid body', () => {
      it('should return a presence', (done) => {
        request.post(`${url}/api/presence`)
        .send(examplePresence)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplePresence.name);
          done();
        });
      });
    });
    describe('with invalid body', () => {
      after( done => {
        examplePresence.name = 'github';
        done();
      })
      it('should return an error', (done) => {
        this.tempPresence = examplePresence;
        delete this.tempPresence.name;
        console.log('tempPresence', this.tempPresence);
        request.post(`${url}/api/presence`)
        .send(this.tempPresence)
        .end((err, res) => {
          expect(err.response.res.text).to.equal('presence validation failed');
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing GET requests', function() {
    afterEach( done => {
      if(this.tempPresence) {
        Presence.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    beforeEach( done => {
      new Presence(examplePresence).save()
      .then( presence => {
        this.tempPresence = presence;
        done();
      })
      .catch(done);
    });
    describe('testing get all route', () => {
      it('should return an array with one presence in it', done => {
        request.get(`${url}/api/presence`)
        .end((err, res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(this.tempPresence._id.toString());
          done();
        });
      });
    });
    describe('testing specific :id route', () => {
      it('should return a presence', done => {
        request.get(`${url}/api/presence/${this.tempPresence._id}`)
        .end((err, res) => {
          expect(res.body.name).to.equal(examplePresence.name);
          done();
        });
      });
      it('should return a status of 500 on invalid id', done => {
        request.get(`${url}/api/presence/1234567`)
        .end((err, res) => {
          expect(err.status).to.equal(500);
          done();
        });
      });
    });
  });
  describe('testing PUT requests', function() {
    beforeEach( done => {
      new Presence(examplePresence).save()
      .then( presence => {
        this.tempPresence = presence;
        done();
      })
      .catch(done);
    });
    afterEach( done => {
      if(this.tempPresence) {
        Presence.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid id and body', () => {
      after( done => {
        this.tempPresence.url = examplePresence.url
        done();
      })
      it('should return a presence', (done) => {
        // this.tempPresence = examplePresence;
        this.tempPresence.url = 'http://linkedin.com';
        console.log('THIS.TEMPPRESENCE', this.tempPresence);
        request.put(`${url}/api/presence/${this.tempPresence._id}`)
        .send(this.tempPresence)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          console.log(res.body);
          expect(res.body.name).to.equal(examplePresence.name);
          expect(res.body.url).to.equal('http://linkedin.com');
          done();
        });
      });
      it('examplePresence should still be clean', () => {
        expect(examplePresence.url).to.equal('http://www.github.com');
        expect(examplePresence.name).to.equal('github');
      });
    });
  });
  describe('testing DELETE requests', () => {
    beforeEach( done => {
      new Presence(examplePresence).save()
      .then( presence => {
        this.tempPresence = presence;
        done();
      })
      .catch(done);
    });
    it('should have deleted an item', (done) => {
      request.delete(`${url}/api/presence/${this.tempPresence._id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        console.log(this.tempPresence._id);
        request.get(`${url}/api/presence`)
        .end((gerr, gres) => {
          expect(gres.body.length).to.equal(0);
          expect(gres.status).to.equal(200);
          done();
        })
      })
    })
  });
});
