export const paymentDemoRegions = {
  shop: "Demo shop workflow",
  mobile: "Demo mobile workflow",
  dealer: "Demo dealer/fleet workflow",
} as const;

export function formatDemoCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
