export type createCompany = {
    id: string;
    code: string;
    userName: string;
    name: string;
    phone: string;
    address: string;
    taxCode: string;
    email: string;
    statusId: string;
    logoUrl: string;
    createAt: string;
    updateAt: string;
    customType: string;
}

export type createSub = {
    companyId: string;
    planId: string;
    time: number;
}

export type subscritionRequest = {
    paymentStatus: string;
    type: string;
    companyRes: createCompany;
    sub: createSub;
}

export type systemConfig = {
    id: string;
    configKey: string;
    configValue: string;
    configType: string;
    description: string;
    groupCode: string;
    updatedBy: string;
    updateAt: string;
    isActive: boolean;
}

export type plansResponse = {
    id: string;
    name: string;
    code: string;
    price: number;
    durationInDays: number;
    isCustom: boolean;
    maxUsers: number;
    maxProducts: number;
    maxBranches: number;
    createdAt: string;
    updatedAt: string;
    description: string;
    plansType: string;
    sort: number;
}

export type CompaniesRegistration = {
    id: string;
    userName: string;
    fullName: string;
    name: string;
    phone: string;
    address: string;
    taxCode: string;
    email: string;
    status: string;
    customType: string;
}

export type plansRegistration = {
    id: string;
    companyResId: string;
    planID: string;
    month: number;
    createAt: string;
    status: string;
}

export type SubscriTrailOrBetaRequest = {
    customType: "PERSONAL" | "BUSINESS";
    fullName: string;
    email: string;
    phone: string;
    company: string;
    tradeName: string;
    statusId: string;
    agree: boolean;
}