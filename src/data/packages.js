/**
 * Pricing packages configuration.
 *
 * TO UPDATE PRICING:
 * - Edit the price field for any package
 * - Add/remove items in the features array
 * - Set featured: true on the package you want highlighted (only one recommended)
 *
 * TO ADD A NEW PACKAGE:
 * - Copy an existing object and modify name, price, features
 *
 * TO REMOVE A PACKAGE:
 * - Delete the entire object from the array
 */
const packages = [
  {
    name: "Essential",
    price: "$800",
    featured: false,
    features: [
      "Up to 4 hours of coverage",
      "1 photographer",
      "100+ edited photos",
      "Online digital gallery",
      "Basic highlight reel (1 min)",
      "Print-ready files",
    ],
  },
  {
    name: "Signature",
    price: "$2,000",
    featured: true,
    features: [
      "Up to 8 hours of coverage",
      "1 photographer + 1 videographer",
      "300+ edited photos",
      "5-minute cinematic highlight film",
      "Full ceremony & reception video",
      "Drone aerial shots",
      "Premium online gallery",
      "Wedding album design",
    ],
  },
  {
    name: "Grand",
    price: "$3,500",
    featured: false,
    features: [
      "Full day coverage (12+ hours)",
      "2 photographers + 1 videographer",
      "500+ edited photos",
      "10-minute cinematic film",
      "Full event documentary edit",
      "Drone & gimbal footage",
      "Same-day teaser edit",
      "Premium leather album",
      "Priority delivery",
    ],
  },
];

export default packages;
