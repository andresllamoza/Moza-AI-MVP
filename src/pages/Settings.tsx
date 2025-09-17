import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { emailConfigSchema, smsConfigSchema, sanitizeInput, type EmailConfig, type SmsConfig } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    senderName: "Moza AI",
    businessAddress: "Moza AI\n1234 Innovation Drive, Suite 100\nSan Francisco, CA 94107\nUnited States"
  });
  const [smsConfig, setSmsConfig] = useState<SmsConfig>({
    fromBrand: "Moza AI"
  });
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});
  const [smsErrors, setSmsErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailErrors({});

    // Sanitize inputs
    const sanitizedConfig = {
      senderName: sanitizeInput(emailConfig.senderName),
      businessAddress: sanitizeInput(emailConfig.businessAddress)
    };

    // Validate
    const result = emailConfigSchema.safeParse(sanitizedConfig);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setEmailErrors(errors);
      return;
    }

    // Update state with sanitized values
    setEmailConfig(sanitizedConfig);
    
    toast({
      title: "Email settings saved",
      description: "Your email configuration has been updated successfully.",
    });
  };

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSmsErrors({});

    // Sanitize inputs
    const sanitizedConfig = {
      fromBrand: sanitizeInput(smsConfig.fromBrand)
    };

    // Validate
    const result = smsConfigSchema.safeParse(sanitizedConfig);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setSmsErrors(errors);
      return;
    }

    // Update state with sanitized values
    setSmsConfig(sanitizedConfig);
    
    toast({
      title: "SMS settings saved",
      description: "Your SMS configuration has been updated successfully.",
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO title="Settings | Moza AI" description="Configure email, SMS, and branding settings." />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Update your communication and branding preferences.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sender">Sender Name</Label>
                <Input 
                  id="sender" 
                  value={emailConfig.senderName}
                  onChange={(e) => setEmailConfig(prev => ({ ...prev, senderName: e.target.value }))}
                  className={emailErrors.senderName ? "border-destructive" : ""}
                />
                {emailErrors.senderName && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{emailErrors.senderName}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea 
                  id="address" 
                  rows={4} 
                  value={emailConfig.businessAddress}
                  onChange={(e) => setEmailConfig(prev => ({ ...prev, businessAddress: e.target.value }))}
                  className={emailErrors.businessAddress ? "border-destructive" : ""}
                />
                {emailErrors.businessAddress && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{emailErrors.businessAddress}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label>Email Domain Suggestions</Label>
                <div className="text-sm text-muted-foreground">Primary: support@mozaai.com • Alternative: hello@mozaai.com</div>
              </div>
              <Button type="submit">Save Email Settings</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMS Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSmsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Default "From" Brand</Label>
                <Input 
                  id="brand" 
                  value={smsConfig.fromBrand}
                  onChange={(e) => setSmsConfig(prev => ({ ...prev, fromBrand: e.target.value }))}
                  className={smsErrors.fromBrand ? "border-destructive" : ""}
                />
                {smsErrors.fromBrand && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{smsErrors.fromBrand}</AlertDescription>
                  </Alert>
                )}
              </div>
              <p className="text-sm text-muted-foreground">For MVP, any Twilio local number works; production will auto-suggest local area codes.</p>
              <Button type="submit">Save SMS Settings</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
