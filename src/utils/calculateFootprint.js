// calculateFootprint.js

// This function extracts values from an "answers" object and calculates the carbon footprint.
export const calculateCarbonFootprint = (answers) => {
  // --- Food & Diet (Category index 0) ---
  const food = answers[0] || {};
  const redMeatMeals = Number(food[0]) || 0;
  const whiteMeatMeals = Number(food[1]) || 0;
  const dairyFrequency = food[2] || ""; // dropdown value
  const foodSource = food[3] || ""; // dropdown value
  const foodWaste = Number(food[4]) || 0;

  // Map dairy frequency to weekly servings.
  const dairyMapping = {
    "Rarely/Never": 0,
    "1–3 servings/week": 2,
    "4–6 servings/week": 5,
    "1 serving/day": 7,
    "2+ servings/day": 14,
  };
  const dairyServings = dairyMapping[dairyFrequency] || 0;

  // Map food sourcing to factor.
  const sourceMapping = {
    "Mostly local/seasonal": 0.9,
    "Mixed/average": 1.0,
    "Mostly imported": 1.1,
  };
  const sourceFactor = sourceMapping[foodSource] || 1.0;

  const EF_RedMeatMeal = 5;
  const EF_WhiteMeatMeal = 2;
  const EF_DairyServing = 1;
  let CF_Food =
    (redMeatMeals * EF_RedMeatMeal * 52) +
    (whiteMeatMeals * EF_WhiteMeatMeal * 52) +
    (dairyServings * EF_DairyServing * 52);
  CF_Food = CF_Food * sourceFactor * (1 + foodWaste / 100);

  // --- Transportation (Category index 1) ---
  const trans = answers[1] || {};
  const vehicleType = trans[0] || "";
  const carDistance = Number(trans[1]) || 0;
  const busWeekly = Number(trans[2]) || 0;
  const trainWeekly = Number(trans[3]) || 0;
  const shortHaulFlights = Number(trans[4]) || 0;
  const longHaulFlights = Number(trans[5]) || 0;
  const flightClass = trans[6] || "Economy";

  const carEFMapping = {
    "Gasoline Car": 0.21,
    "Diesel Car": 0.18,
    "Hybrid": 0.12,
    "Electric": 0.05,
    "Motorbike": 0.10,
    "No Personal Vehicle": 0,
  };
  const EF_Car = carEFMapping[vehicleType] || 0;
  const CF_Car = carDistance * EF_Car;
  const CF_Bus = busWeekly * 52 * 0.10;
  const CF_Train = trainWeekly * 52 * 0.05;
  const CF_ShortFlights = shortHaulFlights * 1000 * 0.15 * 1.9;
  const flightClassMapping = {
    "Economy": 1.0,
    "Premium Economy": 1.4,
    "Business": 2.0,
    "First Class": 3.0,
  };
  const classFactor = flightClassMapping[flightClass] || 1.0;
  const CF_LongFlights = longHaulFlights * 6000 * 0.15 * classFactor * 1.9;

  const CF_Transport = CF_Car + CF_Bus + CF_Train + CF_ShortFlights + CF_LongFlights;

  // --- Home & Household (Category index 2) ---
  const home = answers[2] || {};
  const householdSize = Number(home[0]) || 1;
  const electricity = Number(home[1]) || 0; // assume kWh/month
  const fuelType = home[2] || "";
  const fuelUsage = Number(home[3]) || 0;
  const homeType = home[4] || "";
  const insulation = home[5] || "";
  const wasteWeekly = Number(home[6]) || 0;
  const recycling = home[7] || [];
  const nonFoodSpending = Number(home[8]) || 0;

  // Electricity emission factor.
  const EF_Electricity = 0.15;
  const CF_Electricity = electricity * 12 * EF_Electricity;

  // Fuel emission factors.
  const fuelEFMapping = {
    "Natural Gas": 1.9,
    "Fuel Oil/Diesel": 2.68,
    "Propane/LPG": 1.5,
    "Wood/Biomass": 0.02,
    "Electric": 0,
  };
  const EF_FuelType = fuelEFMapping[fuelType] || 0;
  const CF_Fuel = fuelUsage * EF_FuelType;

  const EF_Waste = 0.3;
  let recyclingFactor = 1.0;
  if (Array.isArray(recycling)) {
    if (recycling.includes("I don't recycle/compost")) recyclingFactor = 1.0;
    else if (recycling.includes("Compost Organics")) recyclingFactor = 0.7;
    else if (recycling.length === 1) recyclingFactor = 0.9;
    else if (recycling.length >= 2) recyclingFactor = 0.8;
  }
  const CF_Waste = wasteWeekly * 52 * EF_Waste * recyclingFactor;

  // Home type and insulation factors.
  const homeTypeMapping = {
    "Apartment": 1000,
    "Townhouse": 1500,
    "Detached House": 2000,
    "Other": 1500,
  };
  const HomeTypeFactor = homeTypeMapping[homeType] || 1500;
  const insulationMapping = {
    "Poor insulation, high thermostat/AC usage": 1.2,
    "Average insulation": 1.0,
    "Well-insulated, moderate thermostat/AC usage": 0.8,
  };
  const InsulationFactor = insulationMapping[insulation] || 1.0;
  const CF_HomeType = HomeTypeFactor * InsulationFactor;
  const CF_Household = CF_Electricity + CF_Fuel + CF_Waste + CF_HomeType;

  // --- Goods & Spending (as part of Home category) ---
  const EF_GoodsSpending = 0.25;
  const CF_Goods = nonFoodSpending * 12 * EF_GoodsSpending;

  // --- Total per-person footprint ---
  const totalCF_person =
    CF_Food +
    CF_Transport +
    (CF_Household / householdSize) +
    (CF_Goods / householdSize);

  return {
    CF_Food,
    CF_Transport,
    CF_Household,
    CF_Goods,
    totalCF_person,
  };
};
