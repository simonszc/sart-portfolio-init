'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGOLAB_URI = 'mongodb://localhost/routetest';

const expect = require('chai').expect;
const request = require('superagent');
const Project = require('../model/project.js');

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleProject = {
  name: 'mtgsealed',
  date: new Date().toString(),
  link: 'http://localhost/project/abcdefg',
  description: ['mtg sealed generator', 'angular app']
};

describe('testing route /api/project', function() {
  describe('testing POST requests', function() {
    afterEach( done => {
      if(this.tempProject) {
        Project.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid body', () => {
      it('should return a project', (done) => {
        request.post(`${url}/api/project`)
        .send(exampleProject)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleProject.name);
          done();
        });
      });
    });
    describe('with invalid body', () => {
      after( done => {
        exampleProject.name = 'mtgsealed';
        done();
      })
      it('should return an error', (done) => {
        this.tempProject = exampleProject;
        delete this.tempProject.name;
        console.log('tempProject', this.tempProject);
        request.post(`${url}/api/project`)
        .send(this.tempProject)
        .end((err, res) => {
          expect(err.response.res.text).to.equal('project validation failed');
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing GET requests', function() {
    afterEach( done => {
      if(this.tempProject) {
        Project.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    beforeEach( done => {
      new Project(exampleProject).save()
      .then( project => {
        this.tempProject = project;
        done();
      })
      .catch(done);
    });
    describe('testing get all route', () => {
      it('should return an array with one project in it', done => {
        request.get(`${url}/api/project`)
        .end((err, res) => {
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(this.tempProject._id.toString());
          done();
        });
      });
    });
    describe('testing specific :id route', () => {
      it('should return a project', done => {
        request.get(`${url}/api/project/${this.tempProject._id}`)
        .end((err, res) => {
          expect(res.body.name).to.equal(exampleProject.name);
          done();
        });
      });
      it('should return a status of 500 on invalid id', done => {
        request.get(`${url}/api/project/1234567`)
        .end((err, res) => {
          expect(err.status).to.equal(500);
          done();
        });
      });
    });
  });
  describe('testing PUT requests', function() {
    beforeEach( done => {
      new Project(exampleProject).save()
      .then( project => {
        this.tempProject = project;
        done();
      })
      .catch(done);
    });
    afterEach( done => {
      if(this.tempProject) {
        Project.remove({})
        .then(() => done())
        .catch(done)
        return;
      }
      done();
    });
    describe('with valid id and body', () => {
      after( done => {
        this.tempProject.description.pop();
        done();
      })
      it('should return a project', (done) => {
        this.tempProject.description.push('utilizes google-charts');
        request.put(`${url}/api/project/${this.tempProject._id}`)
        .send(this.tempProject)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleProject.name);
          expect(res.body.description.length).to.equal(3);
          expect(res.body.description[2]).to.equal('utilizes google-charts');
          expect(res.body.length)
          done();
        });
      });
      it('exampleProject should still be clean', () => {
        expect(exampleProject.description.length).to.equal(2);
        expect(exampleProject.name).to.equal('mtgsealed');
      });
    });
  });
  describe('testing DELETE requests', () => {
    beforeEach( done => {
      new Project(exampleProject).save()
      .then( project => {
        this.tempProject = project;
        done();
      })
      .catch(done);
    });
    it('should have deleted an item', (done) => {
      request.delete(`${url}/api/project/${this.tempProject._id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        console.log(this.tempProject._id);
        request.get(`${url}/api/project`)
        .end((gerr, gres) => {
          expect(gres.body.length).to.equal(0);
          expect(gres.status).to.equal(200);
          done();
        })
      })
    })
  });
});
