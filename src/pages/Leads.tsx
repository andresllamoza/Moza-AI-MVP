import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const leads = [
  { name: 'Alex Turner', email: 'alex@example.com', phone: '(415) 555-1010', source: 'Website Form', status: 'new' },
  { name: 'Jordan Lee', email: 'jordan@example.com', phone: '(628) 555-9933', source: 'Google Ads', status: 'contacted' },
  { name: 'Sam Patel', email: 'sam@example.com', phone: '(650) 555-2211', source: 'Facebook', status: 'qualified' },
];

export default function Leads() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <SEO title="Leads | Moza AI" description="View and manage your captured leads." />
      <header>
        <h1 className="text-3xl font-bold">Leads</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Mock data for MVP demo</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.email}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.phone}</TableCell>
                  <TableCell>{l.source}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={l.status === 'qualified' ? 'default' : l.status === 'contacted' ? 'secondary' : 'outline'}>
                      {l.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
