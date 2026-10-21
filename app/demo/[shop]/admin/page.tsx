import { notFound } from "next/navigation";
import { Admin, type AdminView } from "@/components/demo/admin";
import { getShop } from "@/lib/shops";

const views: AdminView[] = ["dashboard", "leads", "quote", "payments", "automations"];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

// The view lives in the URL (?view=quote&lead=jordan&sent=1, ?view=payments&lead=jordan&paid=1) so
// Stripe can return to the right screen and the outreach video can screenshot each state.
export default async function DemoAdmin({ params, searchParams }: PageProps<"/demo/[shop]/admin">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const q = await searchParams;
  const view = views.find((v) => v === one(q.view)) ?? "dashboard";

  return (
    <Admin
      shop={{ slug: shop.slug, name: shop.name, province: shop.province, city: shop.city }}
      initial={{ view, lead: one(q.lead), sent: one(q.sent) === "1", paid: one(q.paid) === "1" }}
      stripeConnected={(process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_test_")}
    />
  );
}
