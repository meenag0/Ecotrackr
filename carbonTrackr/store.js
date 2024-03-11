import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({

  progress: 0,
  averageWeeklyKm: 0,
  publicTransportFreq: 0,
  airTravelHours: 0,
  carSize: 0,
  carType: 0,


  electricityUsage: 0, // Monthly electricity usage
  naturalGasUsage: 0, // Home heating source
  lightUseTime: 0,
  typeElectricity: 0,


  redMeatConsumption: 0, // Weekly consumption of red meat
  localFoodPurchases: 0, // Frequency of purchasing locally sourced food
  poultryConsumption: 0, // Consumption of processed or packaged foods
  dairyConsumption: 0, // Consumption of dairy products
  seafoodConsumption: 0, // Use of plant-based alternatives

  fastFashion:0,
  sustainableShoppingFrequency:0,
  Recycling:0,
  
});

registerInDevtools({
  WizardStore,
});