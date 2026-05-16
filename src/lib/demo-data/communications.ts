export const communications = [
  {
    id: "message-demo-1",
    customerId: "demo-customer-1",
    type: "email",
    subject: "Demo quote request received",
    body: "Thanks for submitting a WheelPro Demo quote request. This fictional message shows how an auto-response could work.",
    createdAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: "message-demo-2",
    customerId: "demo-customer-2",
    type: "sms",
    subject: "Demo dealer batch reminder",
    body: "Your fictional dealer batch request is queued for review in the WheelPro Demo portal.",
    createdAt: "2026-06-02T11:30:00.000Z",
  },
] as const;

export type Communication = (typeof communications)[number];

export default communications;
