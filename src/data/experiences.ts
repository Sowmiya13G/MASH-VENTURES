import { Building2, Megaphone, PartyPopper, Sparkles, Store, Users, type LucideIcon } from "lucide-react";

export type Experience = {
  slug: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  body: string[];
  idealFor: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const experiences: Experience[] = [
  {
    slug: "robotic-character-appearances",
    title: "Robotic Character Appearances",
    icon: Sparkles,
    blurb: "Make a powerful first impression with larger-than-life robotic characters at your venue.",
    body: [
      "A robotic character appearance puts a towering, futuristic figure at the heart of your venue. People stop, stare, smile and reach for their phones.",
      "We tailor the character, timing and movement to your space so the moment feels intentional, not tacked on.",
    ],
    idealFor: ["Venue openings", "Festivals and fairs", "Hotel and resort events", "Campus events"],
    seoTitle: "Robotic Character Appearances for Venues & Events in India",
    seoDescription:
      "Book larger-than-life robotic character appearances for malls, venues and events across India. Futuristic, photo-ready and unforgettable.",
    keywords: ["robotic character appearance", "robot character for events", "robot mascot hire India"],
  },
  {
    slug: "meet-and-greet-experiences",
    title: "Meet & Greet Experiences",
    icon: Users,
    blurb: "Give guests the chance to interact with robotic characters, take photographs and create unforgettable memories.",
    body: [
      "Meet and greets turn spectators into participants. Guests can walk up, wave, pose and take home a story worth sharing.",
      "Each session is paced to your crowd, from short walk-around moments to organised photo queues.",
    ],
    idealFor: ["Kids' and family events", "Mall weekends", "School and college fests", "Private parties"],
    seoTitle: "Robot Meet & Greet Experiences | Photo Opportunities",
    seoDescription:
      "Interactive robotic character meet and greets with photo opportunities for malls, schools, families and celebrations in India.",
    keywords: ["robot meet and greet", "character meet and greet India", "robot photo opportunity"],
  },
  {
    slug: "brand-activations",
    title: "Brand Activations",
    icon: Megaphone,
    blurb: "Turn your brand into the centre of attention with character-led promotional experiences.",
    body: [
      "Brand activations work when people notice them. A robotic character gives your campaign a face that cuts through noise and draws crowds to your stall, stage or storefront.",
      "We help you bring your brand to life with branded appearances, interactive moments and shareable content.",
    ],
    idealFor: ["Consumer brands", "Retail promotions", "Automotive and electronics launches", "Marketing agencies"],
    seoTitle: "Robotic Brand Activations | Bring Your Brand to Life",
    seoDescription:
      "Character-led brand activations with futuristic robots that attract crowds, create content and bring your brand to life across India.",
    keywords: ["brand activation robot", "experiential marketing India", "promotional robot characters"],
  },
  {
    slug: "shopping-mall-experiences",
    title: "Shopping Mall Experiences",
    icon: Store,
    blurb: "Attract visitors, encourage engagement and create memorable moments that make people stop, watch and participate.",
    body: [
      "Malls compete for attention and footfall. A robotic character in the atrium gives visitors a reason to come, stay longer and return.",
      "We design appearances around your campaigns, festivals and weekends so the experience supports your retail goals.",
    ],
    idealFor: ["Mall management", "Festive and seasonal campaigns", "Weekend footfall drives", "Retail tenants"],
    seoTitle: "Shopping Mall Robot Experiences | Boost Footfall",
    seoDescription:
      "Robotic character experiences for shopping malls in India. Attract visitors, boost engagement and create moments people share.",
    keywords: ["mall events robot", "mall activation ideas India", "robot character for mall"],
  },
  {
    slug: "corporate-experiences",
    title: "Corporate Experiences",
    icon: Building2,
    blurb: "Bring an unexpected element of entertainment to corporate celebrations, employee engagement activities and special occasions.",
    body: [
      "Corporate events are better with a surprise. A robotic character lifts annual days, offsites, conferences and employee engagement programmes with genuine wow factor.",
      "We work with your team on timing, branding and flow so the appearance suits your audience.",
    ],
    idealFor: ["Annual days", "Conferences and offsites", "Employee engagement", "Client events"],
    seoTitle: "Corporate Event Robot Characters | Employee Engagement",
    seoDescription:
      "Add wow factor to corporate events, annual days and employee engagement activities with futuristic robotic characters in India.",
    keywords: ["corporate event entertainment robot", "annual day robot", "employee engagement activity India"],
  },
  {
    slug: "special-celebrations",
    title: "Special Celebrations",
    icon: PartyPopper,
    blurb: "Add a futuristic touch to birthdays, weddings, private celebrations and other memorable occasions.",
    body: [
      "Private occasions deserve a moment guests will talk about for years. A robotic character makes an unforgettable entrance and a brilliant photo backdrop.",
      "From birthdays to weddings and receptions, we adapt the experience to the venue, guests and schedule.",
    ],
    idealFor: ["Weddings and receptions", "Birthday parties", "Private celebrations", "Resort events"],
    seoTitle: "Robot Characters for Weddings & Birthday Parties",
    seoDescription:
      "Hire futuristic robotic characters for weddings, birthdays and private celebrations in India. Memorable entrances and photo moments.",
    keywords: ["robot for wedding entry", "birthday party robot character", "futuristic wedding entertainment"],
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}