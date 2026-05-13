export function getDisplayLocation(item) {
  return [item.town, item.county].filter(Boolean).join(", ");
}