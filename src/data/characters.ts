export type Character = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  description: string[];
  idealFor: string[];
  highlights: string[];
  available: boolean;
  /** Set to true after adding /public/characters/<slug>.webp */
  hasImage: boolean;
  seoTitle: string;
  seoDescription: string;
};

/*
 * NOTE ON NAMES: Bumblebee, Optimus Prime and Hulkbuster are trademarked by their owners.
 * Until you hold commercial licences, the public site uses original names and describes
 * the characters as "inspired by" futuristic robotics. Change names here when licensed.
 */
export const characters: Character[] = [
  {
    slug: "striker",
    name: "Striker",
    role: "The bold, energetic crowd favourite",
    summary: "A vivid, high-energy robotic character that pulls crowds in and keeps them smiling.",
    description: [
      "Striker is the character people see first and remember longest. Bold colours, sharp mechanical detailing and playful movement make it a natural centre of attention in busy malls, expos and family venues.",
      "Built for interaction, Striker greets guests, poses for photographs and brings a burst of futuristic energy to promotions and celebrations.",
    ],
    idealFor: ["Shopping mall footfall drives", "Family and kids' events", "Birthdays and celebrations", "Retail launches and festivals"],
    highlights: ["High-energy crowd engagement", "Photo-friendly design", "Meet-and-greet ready"],
    available: true,
    hasImage: false,
    seoTitle: "Striker | Energetic Robotic Character for Malls & Events",
    seoDescription:
      "Meet Striker, MASH VENTURES' bold, high-energy robotic character for mall promotions, family events, launches and celebrations across India.",
  },
  {
    slug: "titan",
    name: "Titan",
    role: "The powerful, commanding presence",
    summary: "A towering, authoritative robotic character that commands every room it enters.",
    description: [
      "Titan carries a calm, commanding presence. Its imposing silhouette and polished metallic finish make it ideal for premium moments where you want people to stop, look and talk about it.",
      "From corporate stages to product reveals, Titan gives your brand a powerful face and a story audiences remember.",
    ],
    idealFor: ["Corporate events and conferences", "Product launches and reveals", "Exhibitions and trade shows", "Brand activations"],
    highlights: ["Commanding stage presence", "Premium metallic design", "Strong brand-reveal moments"],
    available: true,
    hasImage: false,
    seoTitle: "Titan | Commanding Robotic Character for Corporate Events",
    seoDescription:
      "Titan is MASH VENTURES' towering robotic character for product launches, corporate events, exhibitions and premium brand activations in India.",
  },
  {
    slug: "colossus",
    name: "Colossus",
    role: "The ultimate heavy-armour spectacle",
    summary: "A heavy-armour robotic suit built to be the biggest talking point of any venue.",
    description: [
      "Colossus is pure spectacle. A heavy-armour robotic design with serious visual weight, it turns any entrance, stage or atrium into a showpiece.",
      "Perfect for large-scale launches, exhibitions and mall centrepieces, Colossus delivers the kind of visual impact that fills social feeds.",
    ],
    idealFor: ["Large-scale product launches", "Mall atrium centrepieces", "Exhibitions and expos", "Festival and inauguration events"],
    highlights: ["Maximum visual impact", "Social-media ready", "Built for big venues"],
    available: true,
    hasImage: false,
    seoTitle: "Colossus | Heavy-Armour Robotic Suit Experience",
    seoDescription:
      "Colossus is MASH VENTURES' heavy-armour robotic suit for large launches, mall centrepieces and exhibitions. Book a spectacle that gets people talking.",
  },
  {
    slug: "coming-soon",
    name: "Coming Soon",
    role: "New experiences on the way",
    summary: "More robotic characters and themed collections are in development.",
    description: ["A growing universe of robotic characters is on the way."],
    idealFor: [],
    highlights: [],
    available: false,
    hasImage: false,
    seoTitle: "More Characters Coming Soon",
    seoDescription: "New robotic characters from MASH VENTURES are on the way.",
  },
];

export const availableCharacters = characters.filter((c) => c.available);

export function getCharacter(slug: string) {
  return characters.find((c) => c.slug === slug && c.available);
}