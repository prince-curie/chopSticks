const ServerManager = require('../Service/ServicePlannerService')

class ServicePlannerController {
  async calculateCapacity (req, res, next) {
    try {
      const { serverType, virtualMachines } = req.body;
      const vmManager = new ServerManager(serverType, virtualMachines)
      const result = vmManager.calculate()

      return res.status(200).json({
        status: 'Success',
        message: 'Successfully fetched the holding capacity for the server type',
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ServicePlannerController