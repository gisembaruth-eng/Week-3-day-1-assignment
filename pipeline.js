const listings = [
  {
    name: "Cozy Studio Westlands",
    price: 3500,
    rating: 4.8,
    neighborhood: "Westlands",
    amenities: ["wifi", "kitchen", "parking"],
  },
  {
    name: "Modern Apartment Kilimani",
    price: 6000,
    rating: 4.9,
    neighborhood: "Kilimani",
    amenities: ["wifi", "pool", "gym", "kitchen"],
  },
  {
    name: "Budget Room Eastleigh",
    price: 1500,
    rating: 4.2,
    neighborhood: "Eastleigh",
    amenities: ["wifi"],
  },
  {
    name: "Luxury Penthouse Kilimani",
    price: 15000,
    rating: 4.7,
    neighborhood: "Kilimani",
    amenities: ["wifi", "pool", "gym", "kitchen", "parking", "balcony"],
  },
  {
    name: "Garden Cottage Karen",
    price: 8000,
    rating: 4.6,
    neighborhood: "Karen",
    amenities: ["wifi", "kitchen", "garden", "parking"],
  },
  {
    name: "Artist Loft Westlands",
    price: 4500,
    rating: 4.5,
    neighborhood: "Westlands",
    amenities: ["wifi", "kitchen"],
  },
  {
    name: "Family Home Karen",
    price: 12000,
    rating: 4.9,
    neighborhood: "Karen",
    amenities: ["wifi", "kitchen", "garden", "parking", "pool"],
  },
  {
    name: "Studio Near CBD",
    price: 2000,
    rating: 3.9,
    neighborhood: "CBD",
    amenities: ["wifi"],
  },
  {
    name: "Riverside Apartment",
    price: 5500,
    rating: 4.4,
    neighborhood: "Westlands",
    amenities: ["wifi", "kitchen", "gym"],
  },
  {
    name: "Backpacker Hostel Westlands",
    price: 800,
    rating: 4.1,
    neighborhood: "Westlands",
    amenities: ["wifi"],
  },
];

function findTopListings(listings, neighborhood, maxPrice) {
  return listings
    .filter(
      ({ neighborhood: listingNeighborhood, price }) =>
        listingNeighborhood === neighborhood && price < maxPrice,
    )
    .sort((first, second) => second.rating - first.rating)
    .slice(0, 5)
    .map(
      ({ name, price, rating, amenities }) =>
        `⭐ ${rating.toFixed(1)} — ${name} (KES ${price.toLocaleString(
          "en-KE",
        )}/night) — ${amenities.join(", ")}`,
    );
}

for (const [neighborhood, maxPrice] of [
  ["Westlands", 5000],
  ["Kilimani", 10000],
]) {
  console.log(
    `Top listings in ${neighborhood} under KES ${maxPrice.toLocaleString(
      "en-KE",
    )}:`,
  );
  const topListings = findTopListings(listings, neighborhood, maxPrice);
  if (topListings.length === 0) {
    console.log("No listings found.");
  } else {
    topListings.forEach((listing, index) => {
      console.log(`${index + 1}. ${listing}`);
    });
  }
  console.log("");
}
