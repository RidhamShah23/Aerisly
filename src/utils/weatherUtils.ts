export type RainLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export function getRainLevel(
  probability: number
): RainLevel {
  if (probability <= 20) {
    return "Low";
  }

  if (probability <= 50) {
    return "Moderate";
  }

  if (probability <= 75) {
    return "High";
  }

  return "Very High";
}