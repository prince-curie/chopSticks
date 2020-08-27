class ServicePlanner {
  constructor(serverType, virtualMachines) {
    this.serverType = serverType
    this.virtualMachines = virtualMachines
  }

  calculate() {
    let carryingCapacity = 0;

    let initialServerType = {
        CPU: 0,
        RAM: 0,
        HDD: 0
    }

      // Sort virtual machines in ascending order.
    this.virtualMachines.sort((a,b)=>{
        let costForA = a.CPU + a.RAM + a.HDD;
        let costForB = b.CPU + b.RAM + b.HDD

        return costForA - costForB
    })

    //  A currying function for determining if a VM can fit within the server config and returns a boolean.
    let canFit = ( prev, curr ) => {
        return (type)=>{
            return prev[type] + curr[type] <= this.serverType[type]
        }
    }

    this.virtualMachines.reduce((prev,curr)=>{
        // Prepare curried function statement
        let fittable = canFit(prev, curr)

        // If the current VM can fit in without overload,
        // increase server carrying capacity
        if (fittable('HDD') && fittable('RAM') && fittable('CPU')) {
            carryingCapacity++

            return {
                CPU: prev.CPU + curr.CPU,
                RAM: prev.RAM + curr.RAM,
                HDD: prev.HDD + curr.HDD
            }
        }

        return {
            CPU: prev.CPU,
            RAM: prev.RAM,
            HDD: prev.HDD
        }

    }
    , initialServerType)

    return carryingCapacity
  }
}

module.exports = ServicePlanner;
