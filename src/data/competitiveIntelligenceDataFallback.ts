// Temporary simplified data to resolve build errors
export const simplifiedCompetitorData = [
  {
    name: "Mario's Pizza",
    rating: 4.2,
    reviewCount: 150,
    recentReviews: [
      { author: "John D.", rating: 5, text: "Amazing pizza!", sentiment: "positive" as const },
      { author: "Jane S.", rating: 4, text: "Good service", sentiment: "positive" as const },
      { author: "Mike R.", rating: 3, text: "Average food", sentiment: "neutral" as const }
    ],
    marketPosition: "Local Favorite",
    keyWeakness: "Limited seating",
    keyStrength: "Authentic recipes"
  }
];

export const mockCompetitorAnalysis = simplifiedCompetitorData;