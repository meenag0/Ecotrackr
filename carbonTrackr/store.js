import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({

  progress: 0,
  averageWeeklyMiles: "",
  vehicleFuelEfficiency: "",
  airTravelFrequency: "",
  publicTransportationUsage: "",
  fuelEfficientVehicleOwnership: "",
  carMaintanence: "",
  bikingWalkingFrequency: "",


  electricityUsage: "", // Monthly electricity usage
  heatingUsage: "", // Home heating source
  naturalGasUsage: "",
  avgApplianceAge: "",


  redMeatConsumption: "", // Weekly consumption of red meat
  vegetarianVeganMeals: "", // Proportion of vegetarian or vegan meals
  localFoodPurchases: "", // Frequency of purchasing locally sourced food
  processedFoodConsumption: "", // Consumption of processed or packaged foods
  dairyConsumption: "", // Consumption of dairy products
  seafoodConsumption: "", // Use of plant-based alternatives

  fastFashion:"",
  sustainableShoppingFrequency:"",
  Recycling:"",
  
});

registerInDevtools({
  WizardStore,
});