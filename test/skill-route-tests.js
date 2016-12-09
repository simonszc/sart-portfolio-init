'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGOLAB_URI = 'mongodb://localhost/routetest';

const expect = require('chai').expect;
const request = require('superagent');
const Skill = require('../model/skill.js');

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleSkill = {
  name: 'angularJS',
  skillLevel: 'intermediate'
};

describe('testing route /api/skill', function() {
  describe('testing POST requests', function() {
    afterEach( done => {
      if(this.tempSkill) {
        Skill.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid body', () => {
      it('should return a skill', (done) => {
        request.post(`${url}/api/skill`)
        .send(exampleSkill)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleSkill.name);
          done();
        });
      });
    });
    describe('with invalid body', () => {
      after( done => {
        exampleSkill.name = 'angularJS';
        done();
      })
      it('should return an error', (done) => {
        this.tempSkill = exampleSkill;
        delete this.tempSkill.name;
        console.log('tempSkill', this.tempSkill);
        request.post(`${url}/api/skill`)
        .send(this.tempSkill)
        .end((err, res) => {
          expect(err.response.res.text).to.equal('skill validation failed');
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing GET requests', function() {
    afterEach( done => {
      if(this.tempSkill) {
        Skill.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    beforeEach( done => {
      new Skill(exampleSkill).save()
      .then( skill => {
        this.tempSkill = skill;
        done();
      })
      .catch(done);
    });
    describe('testing get all route', () => {
      it('should return an array with one skill in it', done => {
        request.get(`${url}/api/skill`)
        .end((err, res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(this.tempSkill._id.toString());
          done();
        });
      });
    });
    describe('testing specific :id route', () => {
      it('should return a skill', done => {
        request.get(`${url}/api/skill/${this.tempSkill._id}`)
        .end((err, res) => {
          expect(res.body.name).to.equal(exampleSkill.name);
          done();
        });
      });
      it('should return a status of 500 on invalid id', done => {
        request.get(`${url}/api/skill/1234567`)
        .end((err, res) => {
          expect(err.status).to.equal(500);
          done();
        });
      });
    });
  });
  describe('testing PUT requests', function() {
    beforeEach( done => {
      new Skill(exampleSkill).save()
      .then( skill => {
        this.tempSkill = skill;
        done();
      })
      .catch(done);
    });
    afterEach( done => {
      if(this.tempSkill) {
        Skill.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid id and body', () => {
      after( done => {
        this.tempSkill.skillLevel = exampleSkill.skillLevel;
        done();
      })
      it('should return a skill', (done) => {
        this.tempSkill.skillLevel = 'advanced';
        request.put(`${url}/api/skill/${this.tempSkill._id}`)
        .send(this.tempSkill)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleSkill.name);
          expect(res.body.skillLevel).to.equal('advanced');
          done();
        });
      });
      it('exampleSkill should still be clean', () => {
        expect(exampleSkill.skillLevel).to.equal('intermediate');
        expect(exampleSkill.name).to.equal('angularJS');
      });
    });
  });
  describe('testing DELETE requests', () => {
    beforeEach( done => {
      new Skill(exampleSkill).save()
      .then( skill => {
        this.tempSkill = skill;
        done();
      })
      .catch(done);
    });
    it('should have deleted an item', (done) => {
      request.delete(`${url}/api/skill/${this.tempSkill._id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        console.log(this.tempSkill._id);
        request.get(`${url}/api/skill`)
        .end((gerr, gres) => {
          expect(gres.body.length).to.equal(0);
          expect(gres.status).to.equal(200);
          done();
        })
      })
    })
  });
});
