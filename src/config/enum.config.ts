

export enum UserTypes {
    customer = 1,
    manager = 10,
    owner = 11,
    admin = 12,
    superAdmin = 24
}

export enum UserStatuses {
    active = 1,
    inactive = 0,
    readOnly = 2,
}

export enum ProfileTabOptions {
    Profile = 1,
    Social = 2,
    Links = 3
}

export enum AccountGroups {
    Buyers = 1,
    Sellers = 2
}

export enum AccountTypes {
    Customer = 1,
    StoreStaff = 10,
    StoreOwner = 12,
    Admin = 20,
    SuperAdmin = 24
}

export enum ResourceStatuses {
    Inactive = 0,
    Active = 1,
    InReview = 2,
    InDraft = 3,
    Blacklisted = 4
}

export enum ProductFormIndexes {
    BasicInformation = 0,
    ProductGallery = 1,
    Descriptions = 2,
    ProductDimensions = 3,
    OtherAttributes = 4,
    ProductVariations = 5
}

export enum ManageResourceActions {
    Create = 1,
    Update = 2,
    View = 3,
    Delete = 4
}

export enum OrderStatuses {
    STATUS_PENDING = 1,
    STATUS_AWAITING_FULFILLMENT = 2,
    STATUS_AWAITING_SHIPPING = 3,
    STATUS_PARTIALLY_SHIPPED = 4,
    STATUS_SHIPPED = 5,
    STATUS_AWAITING_PICKUP = 6,
    STATUS_COMPLETED = 7,
    STATUS_CANCELLED = 8,
    STATUS_DISPUTED = 9,
    STATUS_AWAITING_REFUND = 10,
    STATUS_REFUNDED = 11,
}

export enum TransactionStatuses {
    STATUS_PENDING = 0,
    STATUS_COMPLETED = 1,
    STATUS_VERIFIED = 2,
    STATUS_CANCELLED = 3
}

export enum PaymentStatuses {
    STATUS_PAID = 1,
    STATUS_NOT_PAID = 0
}

export enum WalletLockStatuses {
    STATUS_LOCKED = 0,
    STATUS_OPENED = 1
}

export enum LedgerTypes {
    LEDGER_CREDIT = 1,
    LEDGER_DEBIT = 0,
}

export enum ProductTypes {
    SimpleProduct = "simple_product",
    VariationProduct = "variation_product"
}

export enum StoreStaffTypes {
    StoreWorker = 10,
    StoreManager = 11,
    StoreOwner = 12
}