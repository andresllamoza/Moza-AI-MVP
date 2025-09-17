import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Onboarding() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO title="Onboarding | Moza AI" description="Get started with Moza AI in minutes." />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Get Started</h1>
        <p className="text-muted-foreground">Set up the essentials and preview your MVP.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Quick Setup Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Email sender set to "Moza AI"</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> SMS brand set to "Moza AI"</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Review request template ready</li>
          </ul>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
