import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Globe, Camera, Clock, Users, Star, ExternalLink, Edit, Save, X } from "lucide-react";
import { useState } from "react";

const mockBusinessProfile = {
  name: "Moza Construction Services",
  address: "123 Main St, Downtown, City 12345",
  phone: "(555) 123-4567",
  website: "https://mozaconstruction.com",
  description: "Professional construction services with over 15 years of experience. Specializing in residential and commercial projects.",
  hours: {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed"
  },
  categories: ["General Contractor", "Construction Company", "Home Improvement"],
  photos: [
    { id: 1, url: "/api/placeholder/300/200", caption: "Recent kitchen renovation" },
    { id: 2, url: "/api/placeholder/300/200", caption: "Commercial office build" },
    { id: 3, url: "/api/placeholder/300/200", caption: "Team at work" }
  ],
  stats: {
    views: 1247,
    clicks: 234,
    calls: 89,
    directions: 156,
    rating: 4.7,
    totalReviews: 43
  },
  verification: "verified",
  lastUpdated: "2024-01-15"
};

export function GoogleProfileManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(mockBusinessProfile);

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    console.log('Saving profile data:', editData);
  };

  const handleCancel = () => {
    setEditData(mockBusinessProfile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Google Business Profile</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="success">Verified</Badge>
                  <span className="text-sm text-muted-foreground">Last updated: {mockBusinessProfile.lastUpdated}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View on Google
              </Button>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">{mockBusinessProfile.stats.views.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Phone className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Calls</p>
                <p className="text-2xl font-bold">{mockBusinessProfile.stats.calls}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Directions</p>
                <p className="text-2xl font-bold">{mockBusinessProfile.stats.directions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{mockBusinessProfile.stats.rating} ({mockBusinessProfile.stats.totalReviews})</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              {isEditing ? (
                <Input
                  id="business-name"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              ) : (
                <p className="text-sm">{mockBusinessProfile.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                />
              ) : (
                <p className="text-sm">{mockBusinessProfile.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                />
              ) : (
                <p className="text-sm">{mockBusinessProfile.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              {isEditing ? (
                <Input
                  id="website"
                  value={editData.website}
                  onChange={(e) => setEditData({...editData, website: e.target.value})}
                />
              ) : (
                <p className="text-sm">{mockBusinessProfile.website}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  rows={4}
                />
              ) : (
                <p className="text-sm">{mockBusinessProfile.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {mockBusinessProfile.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">{category}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(mockBusinessProfile.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize font-medium">{day}</span>
                  <span className="text-sm text-muted-foreground">{hours}</span>
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="mt-4">
                Edit Hours
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Photos Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photos ({mockBusinessProfile.photos.length})
            </CardTitle>
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Add Photos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockBusinessProfile.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{photo.caption}</p>
                {isEditing && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}