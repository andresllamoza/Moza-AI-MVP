import { SEO } from "@/components/SEO";
import { GoogleProfileManager } from "@/components/GoogleProfileManager";

export default function GoogleProfile() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO 
        title="Google Business Profile | Moza AI" 
        description="Manage your Google Business Profile, track performance, and optimize your online presence." 
      />
      <header>
        <h1 className="text-3xl font-bold">Google Business Profile</h1>
        <p className="text-muted-foreground">Manage your online presence and track your business performance on Google.</p>
      </header>

      <GoogleProfileManager />
    </main>
  );
}