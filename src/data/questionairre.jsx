import Food from "../assets/food.svg";
import Travel from "../assets/travel.svg";
import Household from "../assets/household.svg";
import Personal from "../assets/personal.svg";
const categories = [
  // PERSONAL DIET & FOOD (for personal dietary habits)
  {
    name: "Food & Diet 🥙",
    bgColor: "bg-[#e7a955]",
    img: Food,
    questions: [
      {
        id: 1,
        type: "slider",
        question:
          "How many meals per week do you personally eat that include red meat (beef, lamb, pork)?",
        range: [0, 14]
      },
      {
        id: 2,
        type: "slider",
        question:
          "How many meals per week do you personally eat that include white meat or fish (chicken, turkey, seafood)?",
        range: [0, 14]
      },
      {
        id: 3,
        type: "dropdown",
        question:
          "How frequently do you personally consume dairy products (milk, cheese, yogurt)?",
        options: [
          "Rarely/Never",
          "1–3 servings/week",
          "4–6 servings/week",
          "1 serving/day",
          "2+ servings/day"
        ]
      },
      {
        id: 4,
        type: "dropdown",
        question:
          "What is the primary source of the food you purchase for your diet?",
        options: [
          "Mostly local/seasonal",
          "Mixed/average",
          "Mostly imported"
        ]
      },
      {
        id: 5,
        type: "slider",
        question:
          "What percentage of the food you purchase ends up wasted? (Enter a percentage)",
        range: [0, 50]
      }
    ]
  },
  // PERSONAL TRANSPORTATION & TRAVEL (for individual commuting and travel choices)
  {
    name: "Transportation & Travel ✈️",
    bgColor: "bg-[#c26e6e]",
    img: Travel,
    questions: [
      {
        id: 6,
        type: "dropdown",
        question:
          "Do you use a personal vehicle? If yes, select the type of vehicle you personally drive:",
        options: [
          "Gasoline Car",
          "Diesel Car",
          "Hybrid",
          "Electric",
          "Motorbike",
          "No Personal Vehicle"
        ]
      },
      {
        id: 7,
        type: "numeric",
        question:
          "How many kilometers/miles do you personally drive per year (for all personal vehicles combined)?",
        unitToggle: ["km", "mi"]
      },
      {
        id: 8,
        type: "numeric",
        question:
          "How many kilometers/miles do you travel by bus per week?",
        unitToggle: ["km", "mi"]
      },
      {
        id: 9,
        type: "numeric",
        question:
          "How many kilometers/miles do you travel by train/metro per week?",
        unitToggle: ["km", "mi"]
      },
      {
        id: 10,
        type: "numeric",
        question:
          "How many short-haul flights (≤3 hours) do you take per year?"
      },
      {
        id: 11,
        type: "numeric",
        question:
          "How many long-haul flights (>3 hours) do you take per year?"
      },
      {
        id: 12,
        type: "dropdown",
        question:
          "For long-haul flights, which class do you usually fly? (This affects your emissions per flight.)",
        options: [
          "Economy",
          "Premium Economy",
          "Business",
          "First Class"
        ]
      },
      {
        id: 13,
        type: "checkbox",
        question:
          "Do you use any additional motorized travel modes? (Select all that apply; these are personal travel choices)",
        options: [
          "Ferry",
          "Taxi/Rideshare",
          "Other",
          "None"
        ]
      }
    ]
  },
  // HOUSEHOLD ENERGY, FUEL & WASTE (for data that applies to your entire household)
  {
    name: "Home & Household ⚡",
    bgColor: "bg-[#b8dba3]",
    img: Household,
    questions: [
      {
        id: 14,
        type: "numeric",
        question:
          "How many people live in your household? (Enter the total number of residents)"
      },
      {
        id: 15,
        type: "numeric",
        question:
          "What is your household’s monthly electricity usage? (Enter total kWh for your household)",
        // Multiply by 12 to get annual consumption, then divide by household size.
      },
      {
        id: 16,
        type: "dropdown",
        question:
          "What is your household’s primary heating/cooking fuel?",
        options: [
          "Natural Gas",
          "Fuel Oil/Diesel",
          "Propane/LPG",
          "Wood/Biomass",
          "Electric",
          "None"
        ]
      },
      {
        id: 17,
        type: "numeric",
        question:
          "What is your household’s annual consumption of the selected fuel? (Enter total consumption)",
        unitToggle: ["L", "GJ", "kWh"]
      },
      {
        id: 18,
        type: "dropdown",
        question:
          "What type of home do you live in? (Select the one that best describes your household residence)",
        options: [
          "Apartment",
          "Townhouse",
          "Detached House",
          "Other"
        ]
      },
      {
        id: 19,
        type: "dropdown",
        question:
          "How would you describe your home’s insulation and heating/cooling usage? (For your entire household)",
        options: [
          "Poor insulation, high energy usage",
          "Average insulation",
          "Well-insulated, moderate energy usage"
        ]
      },
      {
        id: 20,
        type: "numeric",
        question:
          "How much household waste does your home generate per week?",
        unitToggle: ["kg", "lbs"]
      },
      {
        id: 21,
        type: "checkbox",
        question:
          "Which materials does your household recycle or compost? (Select all that apply)",
        options: [
          "Paper",
          "Plastic",
          "Metal/Glass",
          "Organic waste",
          "None"
        ]
      },
      {
        // Combine spending questions into one unified spending input.
        id: 22,
        type: "numeric",
        question:
          "What is your household’s total monthly expenditure on non-food items? (Include both recurring and discretionary spending; enter amount in CAD$)"
      }
    ]
  },
  // PERSONAL INFORMATION & DEMOGRAPHICS (for personal characteristics and location)
  {
    name: "Personal Info 📍",
    bgColor: "bg-[#cf7553]",
    img: Personal,
    questions: [
      {
        id: 23,
        type: "dropdown",
        question:
          "Select your province (this is for personal benchmarking):",
        options: [
          "Alberta",
          "British Columbia",
          "Manitoba",
          "New Brunswick",
          "Newfoundland and Labrador",
          "Nova Scotia",
          "Ontario",
          "Prince Edward Island",
          "Quebec",
          "Saskatchewan",
          "Northwest Territories",
          "Nunavut",
          "Yukon"
        ]
      },
      {
        id: 24,
        type: "dropdown",
        question:
          "What is your age group?",
        options: [
          "Under 18",
          "18–30",
          "31–50",
          "51+"
        ]
      },
      {
        id: 25,
        type: "dropdown",
        question:
          "Gender:",
        options: [
          "Male",
          "Female",
          "Non-binary/Other",
          "Prefer not to say"
        ]
      },
      {
        id: 26,
        type: "dropdown",
        question:
          "Do you live in an urban, suburban, or rural area? (This is for personal benchmarking)",
        options: [
          "Urban",
          "Suburban",
          "Rural"
        ]
      }
    ]
  }
];

export default categories;
