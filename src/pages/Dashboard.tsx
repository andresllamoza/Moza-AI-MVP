import { SEO } from "@/components/SEO";
import { CRMDashboard } from "@/components/CRMDashboard";

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO
        title="CRM Dashboard | Moza AI - Complete Business Management"
        description="Comprehensive CRM dashboard for managing reviews, Google profiles, leads, and business growth."
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <p className="text-muted-foreground">Complete business management and growth platform.</p>
      </header>

      <CRMDashboard />
    </main>
  );
}