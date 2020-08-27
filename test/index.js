const { describe, it } = require('mocha')
const ServicePlannerService = require('../Service/ServicePlannerService')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)

const serverType = {CPU: 2, RAM: 32, HDD: 100}
const virtualMachines = [{CPU: 1, RAM: 16, HDD: 10}, {CPU: 1, RAM: 16, HDD: 10}, {CPU: 2, RAM: 32, HDD: 100}]

describe('Test the calculate function of the planner service', () => {
  it('should return the number of server a virtual machine can carry', () => {
    const vmManager = new ServicePlannerService(serverType, virtualMachines)
    const result = vmManager.calculate()

    assert.equal(result, 2)
  })
})

describe('Run integration test on service planner', () => {
  it('should return a success message', async () => {
    const res = await chai.request(app)
      .post('/service/planner')
      .send({
        "serverType": {"CPU": 2, "RAM": 32, "HDD": 100},
        "virtualMachines": [
            {"CPU": 1, "RAM": 16, "HDD": 10}, {"CPU": 1, "RAM": 16, "HDD": 10}, {"CPU": 2, "RAM": 32, "HDD": 100}
        ]
      })
    
    assert.equal(res.body.data, 2)
  })
})