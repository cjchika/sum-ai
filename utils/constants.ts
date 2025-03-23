export const plans: PriceType[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    description: "For individuals",
    items: [
      "5 Summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    paymentLink: process.env.BASIC_PAYMENT_LINK!,
    priceId: process.env.BASIC_PAYMENT_ID!,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19.99,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF Summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: process.env.PRO_PAYMENT_LINK!,
    priceId: process.env.PRO_PAYMENT_ID!,
  },
];

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
