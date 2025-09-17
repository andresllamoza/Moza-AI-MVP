import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ExternalLink, Send, Eye, Filter, Search, Plus, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

const mockReviews = [
  { 
    id: 1, 
    customer: 'Sarah Johnson', 
    rating: 5, 
    source: 'Google', 
    comment: 'Outstanding service! The team was professional and delivered exactly what we needed.', 
    sentiment: 'positive',
    date: '2024-01-15',
    status: 'published',
    response: 'Thank you Sarah! We appreciate your business.',
    location: 'Downtown Office'
  },
  { 
    id: 2, 
    customer: 'Mike Chen', 
    rating: 4, 
    source: 'Yelp', 
    comment: 'Good work overall, minor delays but quality was great.', 
    sentiment: 'positive',
    date: '2024-01-14',
    status: 'pending_response',
    response: null,
    location: 'West Branch'
  },
  { 
    id: 3, 
    customer: 'Lisa Rodriguez', 
    rating: 2, 
    source: 'Facebook', 
    comment: 'Service was slow and communication could be better.', 
    sentiment: 'negative',
    date: '2024-01-13',
    status: 'needs_attention',
    response: null,
    location: 'North Location'
  },
  { 
    id: 4, 
    customer: 'David Kim', 
    rating: 5, 
    source: 'Google', 
    comment: 'Absolutely amazing! Will definitely use again.', 
    sentiment: 'positive',
    date: '2024-01-12',
    status: 'published',
    response: 'Thank you David! Looking forward to working with you again.',
    location: 'Downtown Office'
  },
  { 
    id: 5, 
    customer: 'Emily Watson', 
    rating: 1, 
    source: 'Google', 
    comment: 'Very disappointed with the service quality and timing.', 
    sentiment: 'negative',
    date: '2024-01-11',
    status: 'escalated',
    response: null,
    location: 'South Branch'
  }
];

export function ReviewsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterSentiment, setFilterSentiment] = useState("all");

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === "all" || review.source === filterSource;
    const matchesSentiment = filterSentiment === "all" || review.sentiment === filterSentiment;
    return matchesSearch && matchesSource && matchesSentiment;
  });

  const averageRating = (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1);
  const positiveReviews = mockReviews.filter(r => r.sentiment === 'positive').length;
  const needsAttention = mockReviews.filter(r => r.status === 'needs_attention' || r.status === 'escalated').length;

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Badge variant="success">Positive</Badge>;
      case 'neutral': return <Badge variant="secondary">Neutral</Badge>;
      case 'negative': return <Badge variant="destructive">Negative</Badge>;
      default: return <Badge variant="secondary">{sentiment}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge variant="success">Published</Badge>;
      case 'pending_response': return <Badge variant="warning">Pending Response</Badge>;
      case 'needs_attention': return <Badge variant="destructive">Needs Attention</Badge>;
      case 'escalated': return <Badge variant="urgent">Escalated</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Positive Reviews</p>
                <p className="text-2xl font-bold">{positiveReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold">{needsAttention}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{mockReviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Review Management</CardTitle>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Reviews
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Google">Google</SelectItem>
                <SelectItem value="Yelp">Yelp</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSentiment} onValueChange={setFilterSentiment}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{review.customer}</p>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {'★'.repeat(review.rating)}
                      <span className="text-sm text-muted-foreground ml-1">({review.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>{review.source}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate">{review.comment}</p>
                  </TableCell>
                  <TableCell>{getSentimentBadge(review.sentiment)}</TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      {!review.response && (
                        <Button size="sm" variant="outline" className="gap-1">
                          <Send className="h-3 w-3" />
                          Respond
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        View on {review.source}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}