const express = require('express')
const bodyParser = require('body-parser')
const ServicePlannerController = require('./controller/ServicePlanner')
const ServicePlannerValidator = require('./validator/ServicePlannerValidator')
const app = express()
const port = 3000

const ServicePlan = new ServicePlannerController();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/service/planner', ServicePlannerValidator.validateBody(ServicePlannerValidator.schemas.calucateVm), ServicePlan.calculateCapacity)

app.use(function (err, req, res, next) {
  console.log(err)
  return res.status(500).json({
    status: 'System Error'
  })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

module.exports = app