interface Breakpoint {
  concentrationLow: number;
  concentrationHigh: number;
  aqiLow: number;
  aqiHigh: number;
}

const PM25_BREAKPOINTS: Breakpoint[] = [
  {
    concentrationLow: 0,
    concentrationHigh: 30,
    aqiLow: 0,
    aqiHigh: 50,
  },
  {
    concentrationLow: 31,
    concentrationHigh: 60,
    aqiLow: 51,
    aqiHigh: 100,
  },
  {
    concentrationLow: 61,
    concentrationHigh: 90,
    aqiLow: 101,
    aqiHigh: 200,
  },
  {
    concentrationLow: 91,
    concentrationHigh: 120,
    aqiLow: 201,
    aqiHigh: 300,
  },
  {
    concentrationLow: 121,
    concentrationHigh: 250,
    aqiLow: 301,
    aqiHigh: 400,
  },
  {
    concentrationLow: 251,
    concentrationHigh: Infinity,
    aqiLow: 401,
    aqiHigh: 500,
  },
];

const PM10_BREAKPOINTS: Breakpoint[] = [
  {
    concentrationLow: 0,
    concentrationHigh: 50,
    aqiLow: 0,
    aqiHigh: 50,
  },
  {
    concentrationLow: 51,
    concentrationHigh: 100,
    aqiLow: 51,
    aqiHigh: 100,
  },
  {
    concentrationLow: 101,
    concentrationHigh: 250,
    aqiLow: 101,
    aqiHigh: 200,
  },
  {
    concentrationLow: 251,
    concentrationHigh: 350,
    aqiLow: 201,
    aqiHigh: 300,
  },
  {
    concentrationLow: 351,
    concentrationHigh: 430,
    aqiLow: 301,
    aqiHigh: 400,
  },
  {
    concentrationLow: 431,
    concentrationHigh: Infinity,
    aqiLow: 401,
    aqiHigh: 500,
  },
];

const NO2_BREAKPOINTS: Breakpoint[] = [
  {
    concentrationLow: 0,
    concentrationHigh: 40,
    aqiLow: 0,
    aqiHigh: 50,
  },
  {
    concentrationLow: 41,
    concentrationHigh: 80,
    aqiLow: 51,
    aqiHigh: 100,
  },
  {
    concentrationLow: 81,
    concentrationHigh: 180,
    aqiLow: 101,
    aqiHigh: 200,
  },
  {
    concentrationLow: 181,
    concentrationHigh: 280,
    aqiLow: 201,
    aqiHigh: 300,
  },
  {
    concentrationLow: 281,
    concentrationHigh: 400,
    aqiLow: 301,
    aqiHigh: 400,
  },
  {
    concentrationLow: 401,
    concentrationHigh: Infinity,
    aqiLow: 401,
    aqiHigh: 500,
  },
];

const OZONE_BREAKPOINTS: Breakpoint[] = [
  {
    concentrationLow: 0,
    concentrationHigh: 50,
    aqiLow: 0,
    aqiHigh: 50,
  },
  {
    concentrationLow: 51,
    concentrationHigh: 100,
    aqiLow: 51,
    aqiHigh: 100,
  },
  {
    concentrationLow: 101,
    concentrationHigh: 168,
    aqiLow: 101,
    aqiHigh: 200,
  },
  {
    concentrationLow: 169,
    concentrationHigh: 208,
    aqiLow: 201,
    aqiHigh: 300,
  },
  {
    concentrationLow: 209,
    concentrationHigh: 748,
    aqiLow: 301,
    aqiHigh: 400,
  },
  {
    concentrationLow: 749,
    concentrationHigh: Infinity,
    aqiLow: 401,
    aqiHigh: 500,
  },
];

function calculateSubIndex(
  concentration: number,
  breakpoints: Breakpoint[]
): number | null {

  if (!Number.isFinite(concentration)) {
    return null;
  }

  const breakpoint =
    breakpoints.find(
      (item) =>
        concentration >= item.concentrationLow &&
        concentration <= item.concentrationHigh
    );

  if (!breakpoint) {
    return null;
  }

  const {
    concentrationLow,
    concentrationHigh,
    aqiLow,
    aqiHigh,
  } = breakpoint;

  if (concentrationHigh === Infinity) {
    return 500;
  }

  const index =
    ((aqiHigh - aqiLow) /
      (concentrationHigh - concentrationLow)) *
      (concentration - concentrationLow) +
    aqiLow;

  return Math.round(index);
}

function average(values: number[]): number {
  const validValues = values.filter(
    (value) => Number.isFinite(value)
  );

  if (validValues.length === 0) {
    return 0;
  }

  return (
    validValues.reduce(
      (sum, value) => sum + value,
      0
    ) / validValues.length
  );
}

export function calculateIndianAQI(
  data: {
    pm10: number[];
    pm25: number[];
    nitrogenDioxide: number[];
    ozone: number[];
  }
): number {

  const pm10Average = average(
    data.pm10
  );

  const pm25Average = average(
    data.pm25
  );

  const no2Average = average(
    data.nitrogenDioxide
  );

  // CPCB uses an 8-hour averaging period
  // for ozone.
  const ozoneValues =
    data.ozone.slice(-8);

  const ozoneAverage = average(
    ozoneValues
  );

  const subIndices = [
    calculateSubIndex(
      pm10Average,
      PM10_BREAKPOINTS
    ),

    calculateSubIndex(
      pm25Average,
      PM25_BREAKPOINTS
    ),

    calculateSubIndex(
      no2Average,
      NO2_BREAKPOINTS
    ),

    calculateSubIndex(
      ozoneAverage,
      OZONE_BREAKPOINTS
    ),
  ].filter(
    (value): value is number =>
      value !== null
  );

  if (subIndices.length === 0) {
    return 0;
  }

  return Math.max(...subIndices);
}