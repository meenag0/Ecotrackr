import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({

  progress: 0,
  averageWeeklyMiles: "",
  vehicleFuelEfficiency: "",
  airTravelFrequency: "",
  publicTransportationUsage: "",
  bikingWalkingFrequency: "",
  fuelEfficientVehicleOwnership: "",
  ecoDrivingTechniquesUsage: "",
  distanceToWorkplace: "",

  electricityUsage: "", // Monthly electricity usage
  heatingSource: "", // Home heating source
  ElectricityUsage: "",
  NaturalGasUsage: "",
  HeatingOilUsage: "",
  CoalUsage: "",
  LPGUsage: "",
  PropaneUsage: "",

  redMeatConsumption: "", // Weekly consumption of red meat
  vegetarianVeganMeals: "", // Proportion of vegetarian or vegan meals
  seafoodSource: "", // Source of seafood
  localFoodPurchases: "", // Frequency of purchasing locally sourced food
  processedFoodConsumption: "", // Consumption of processed or packaged foods
  foodWasteReduction: "", // Use of food waste reduction strategies
  foodCarbonFootprintAwareness: "", // Awareness of food carbon footprint
  organicProducePreference: "", // Preference for organic or sustainably grown produce
  dairyConsumption: "", // Consumption of dairy products
  plantBasedAlternatives: "", // Use of plant-based alternatives
});

registerInDevtools({
  WizardStore,
});