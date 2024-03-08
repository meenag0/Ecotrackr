import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({

  progress: 0,
  averageWeeklyKm: "",
  publicTransportFreq: "",
  airTravelHours: "",
  carSize: "",
  carType: "",


  electricityUsage: "", // Monthly electricity usage
  naturalGasUsage: "", // Home heating source
  lightUseTime: "",
  typeElectricity: "",


  redMeatConsumption: "", // Weekly consumption of red meat
  vegetarianVeganMeals: "", // Proportion of vegetarian or vegan meals
  localFoodPurchases: "", // Frequency of purchasing locally sourced food
  poultryConsumption: "", // Consumption of processed or packaged foods
  dairyConsumption: "", // Consumption of dairy products
  seafoodConsumption: "", // Use of plant-based alternatives

  fastFashion:0,
  sustainableShoppingFrequency:0,
  Recycling:0,
  
});

registerInDevtools({
  WizardStore,
});