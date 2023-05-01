

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