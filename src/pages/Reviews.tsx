import { SEO } from "@/components/SEO";
import { ReviewsManagement } from "@/components/ReviewsManagement";

export default function Reviews() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO title="Reviews Management | Moza AI" description="Comprehensive review management and reputation monitoring." />
      <header>
        <h1 className="text-3xl font-bold">Reviews Management</h1>
        <p className="text-muted-foreground">Monitor, respond to, and request customer reviews across all platforms.</p>
      </header>

      <ReviewsManagement />
    </main>
  );
}
