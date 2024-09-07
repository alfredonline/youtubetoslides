type GeneratedPowerpoint = {
    id: string;
    link: string;
    createdAt: Date;
    slideCount: number;
    sourceURL: string;
    title?: string | null;  // Allow title to be string | null
    description?: string | null; // Ensure description is also string | null if needed
};

type UserDB = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    hasPurchasedCoins: boolean;
    lastCoinPurchase?: Date | null;
    totalSpend: number;
    tokenCount: number;
    powerpoints: GeneratedPowerpoint[];
    currentSecretForPayment?: string | null;
};

type Tips = {
    icon: string;
    description: string;
  };

export type { UserDB, GeneratedPowerpoint, Tips};