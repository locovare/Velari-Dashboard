export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
}

export interface DiscordGuild {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: string
  botInGuild?: boolean
}

export interface DiscordTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface BotInviteResponse {
  url: string
}

export interface GuildChannel {
  id: string
  name: string
  type: number // 0 for text, 4 for category
}

export interface GuildRole {
  id: string
  name: string
  color: number
}

export interface WelcomeSettings {
  enabled: boolean
  channelId: string
  dmEnabled: boolean
  message: string
  bannerUrl: string
  autoRoleIds: string[]
}

export interface TicketSettings {
  enabled: boolean
  categoryId: string
  staffRoleIds: string[]
  reasons: { id: string; label: string; emoji: string }[]
  closeMessage: string
  transcriptsEnabled: boolean
  transcriptChannelId: string
}

export interface ModerationSettings {
  logChannelId: string
  muteRoleId: string
  antiSpamEnabled: boolean
  raidProtectionEnabled: boolean
  bannedWords: string[]
  strikeActions: { [key: string]: string }
}

export interface BotSettings {
  prefix: string
  language: string
  timezone: string
  name: string
  avatar: string
  commandWhitelist: string[]
  commandBlacklist: string[]
}

export interface AutoRolesSettings {
  autoRoleOnJoinEnabled: boolean;
  autoRoleOnJoinId: string | null;
  reactionRoleMenus: ReactionRoleMenu[];
}

export interface ReactionRoleMenu {
  id: string;
  messageId: string;
  channelId: string;
  embedTitle: string;
  embedDescription: string;
  embedColor: string;
  stackRoles: boolean;
  removeOnUnreact: boolean;
  roleLimit: number;
  mappings: { emoji: string; roleId: string }[];
}

export type LogType = 'moderation' | 'tickets' | 'joins_leaves' | 'messages' | 'all';

export interface LogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userTag: string;
  type: Omit<LogType, 'all'>;
  action: string;
}

export interface ServerAnalytics {
  serverGrowth: string;
  engagement: string;
  topCommand: string;
  logs: LogEntry[];
}

export interface PermissionSettings {
  roleId: string;
  dashboardAccess: boolean;
  modules: {
    [key: string]: boolean; // e.g., 'welcome', 'tickets'
  };
  allowedCommands: string[];
  deniedCommands: string[];
}

export type KeyType = 'Premium' | 'Trial' | 'Custom';
export type KeyStatus = 'Active' | 'Redeemed' | 'Expired' | 'Revoked';

export interface LicenseKey {
  id: string;
  key: string;
  type: KeyType;
  unlocks: string; // e.g., "Premium Modules" or a specific role name
  status: KeyStatus;
  expiry: string | null; // ISO date string or null
  uses: number;
  maxUses: number | null;
  redeemedBy: string | null; // User ID
  redeemedAt: string | null; // ISO date string
}

export interface KeyRedemptionLog {
    id: string;
    timestamp: string;
    key: string;
    userId: string;
    userTag: string;
    status: 'Success' | 'Failed: Invalid Key' | 'Failed: Already Redeemed';
}

export type ProductType = 'monthly' | 'one-time' | 'digital-goods' | 'keys';
export type PaymentProvider = 'stripe' | 'paypal';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';

export interface Product {
    id: string;
    name: string;
    description: string;
    type: ProductType;
    price: number; // in cents
    currency: string;
    features: string[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Subscription {
    id: string;
    customerId: string;
    productId: string;
    status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
}

export interface Transaction {
    id: string;
    customerId: string;
    productId: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    paymentProvider: PaymentProvider;
    checkoutSessionId?: string;
    refundedAt?: string;
    refundAmount?: number;
    createdAt: string;
}

export interface Customer {
    id: string;
    email: string;
    name: string;
    discordId?: string;
    totalSpent: number;
    subscriptionCount: number;
    createdAt: string;
    lastPurchaseAt?: string;
}

export interface SalesAnalytics {
    totalRevenue: number;
    monthlyRevenue: number;
    totalTransactions: number;
    activeSubscriptions: number;
    topProducts: Array<{
        productId: string;
        productName: string;
        sales: number;
        revenue: number;
    }>;
    recentTransactions: Transaction[];
}

export type StorefrontStatus = 'active' | 'inactive' | 'pending';
export type StoreProductType = 'role' | 'key' | 'file' | 'service';
export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type DeliveryType = 'auto-role' | 'dm-key' | 'file-download' | 'manual';

export interface Storefront {
    id: string;
    guildId: string;
    name: string;
    description: string;
    bannerUrl?: string;
    customUrl: string; // e.g., "yourserver"
    currency: string;
    paymentProcessor: 'stripe' | 'paypal';
    status: StorefrontStatus;
    tos: string;
    refundPolicy: string;
    payoutDestination: {
        type: 'paypal' | 'stripe';
        email?: string;
        accountId?: string;
    };
    settings: {
        requireApproval: boolean;
        staffOnly: boolean;
        enablePromoCodes: boolean;
        enableSubscriptions: boolean;
        autoAssignRoles: boolean;
        dmConfirmations: boolean;
    };
    createdAt: string;
    updatedAt: string;
}

export interface StoreProduct {
    id: string;
    storefrontId: string;
    name: string;
    description: string;
    imageUrl?: string;
    type: StoreProductType;
    price: number; // in cents
    stock: number | null; // null for unlimited
    tags: string[];
    category: string;
    customMessage?: string;
    deliveryType: DeliveryType;
    deliveryData: {
        roleId?: string;
        fileUrl?: string;
        keyTemplate?: string;
        instructions?: string;
    };
    visibility: 'public' | 'staff-only';
    requireApproval: boolean;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StoreOrder {
    id: string;
    storefrontId: string;
    customerId: string;
    customerDiscordId: string;
    customerEmail: string;
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    currency: string;
    status: OrderStatus;
    paymentProcessor: 'stripe' | 'paypal';
    paymentIntentId?: string;
    promoCode?: string;
    discountAmount?: number;
    deliveryData: {
        rolesAssigned: string[];
        keysDelivered: string[];
        filesDownloaded: string[];
        manualDeliveryNotes?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface StoreCustomer {
    id: string;
    storefrontId: string;
    discordId: string;
    email: string;
    totalSpent: number;
    orderCount: number;
    activeSubscriptions: number;
    createdAt: string;
    lastPurchaseAt?: string;
}

export interface PromoCode {
    id: string;
    storefrontId: string;
    code: string;
    type: 'flat' | 'percent';
    value: number; // flat amount in cents or percentage
    maxUses: number | null;
    currentUses: number;
    validFrom: string;
    validUntil: string;
    active: boolean;
    createdAt: string;
}

export interface StoreSubscription {
    id: string;
    storefrontId: string;
    customerId: string;
    productId: string;
    status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    trialEnd?: string;
    createdAt: string;
}

export interface StoreAnalytics {
    totalRevenue: number;
    monthlyRevenue: number;
    totalOrders: number;
    activeCustomers: number;
    topProducts: Array<{
        productId: string;
        productName: string;
        sales: number;
        revenue: number;
    }>;
    recentOrders: StoreOrder[];
    pendingPayouts: number;
} 