j'use strict'

process.env.NODE_ENV = 'test'
const CWD = process.cwd()
const Join = require('path').join
const Chai = require('chai')
const Sinon = require('sinon')
const SinonChai = require('sinon-chai')
const MemStream = require('memorystream')
const Rethink = require(Join(CWD, 'src', 'api', 'db'))
const Handler = require(Join(CWD, 'src', 'api', 'rest', 'handler'))
Chai.should()
Chai.use(SinonChai)

describe('ApiRouteHandler', function () {
  before(function (done) {
    Rethink.instance.dbCreate('unijas_test_test')
    .then(() => Rethink.db.tableCreate('user'))
    .then(() => {
      return Rethink.db.table('user')
      .insert([
        { name: 'One', age: 20},
        { name: 'Two', age: 22}
      ])
    })
    .then(() => { done() })
  })
  let req, res, next

  beforeEach(function () {
    req = {}
    res = {}
    next = Sinon.spy()
    req.params = {
      entity: 'user'
    }
  })

  describe('preparate()', function () {
    it('should set mime-type to "application/json"', function () {
      res.type = Sinon.spy()
      Handler.preparate(req, res, next)
      res.type.should.have.been.calledWith('application/json')
    })
  })

  describe('enities.list()', function () {
    let expectation

    before((done) => {
      expectation = ''
      res = new MemStream()
      res.on('data', function(chunk) {
        expectation += chunk.toString()
      })
      res.on('end', () => {
        expectation = JSON.parse(expectation)
        done()
      })
      Handler.list(req, res)
    })

    it('should return an array', function () {
      expectation.should.be.a.array
    })

    it('should have a name-property with value "One" on first element', () => {
      expectation[0].name.should.equal('One')
    })

    it('should have a name-property with value "Two" on second element', () => {
      expectation[1].name.should.equal('Two')
    })
  })

  after(function(done) {
    Rethink.instance.dbDrop('unijas_test_test').then(() => {
      Rethink.instance.getPoolMaster().drain()
      done()
    })
  })
})
