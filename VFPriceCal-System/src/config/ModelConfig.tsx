export type companiesStatus = {
    id: number;
    code: string;
    name: string;
}

export type Companies = {
    id: string;
    code: string;
    userName: string;
    name: string;
    phone: string;
    address: string;
    taxCode: string;
    email: string;
    statusId: string;
    plan: string;
    logoUrl: string;
    duration: string;
    isPay: string;
    createAt: string;
    startTime: string
    endTime: string;
    updateAt: string;
    priceMonth: number;
    customType: string;
}

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

export type paymentRequest = {
    paymentStatus: string;
    type: string;
    companyRes: createCompany;
    sub: createSub;
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

export type plans = {
    id: string;
    code: string;
    name: string;
    price: number;
    createAt: string;
    durationInDays: number;
    description: string;
}

export type crePlans = {
    id: string;
    name: string;
    code: string;
    price: number;
    durationInDays: number;
    isCustom: boolean;
    maxUsers: number;
    maxProducts: number;
    maxBranches: number;
    description: string;
}

export type plansRegistration = {
    id: string;
    companyResId: string;
    planID: string;
    month: number;
    createAt: string;
    status: string;
}


export type orders = {
    companyName: string;
    companyCode: string;
    plansName: string;
    createAt: string;
    totalAmount: number;
    pay: boolean;
}
   
export type paymentStatus = {
    id: string;
    name: string;
    code: string;
}

export type paymentMethod = {
    id: string;
    name: string;
    code: string;
    descprition: string;
    createAt: string;
}


export type SystemConfigRequest = {
   configKey: string   ;
    configValue: string;
    configType: string;
    description: string;
    groupCode: string;
    isActive: boolean;
}

export type SystemConfigResponse = {
    id: string;
   configKey: string   ;
    configValue: string;
    configType: string;
    description: string;
    groupCode: string;
    updatedBy: string;
    updateAt: string;
    isActive: boolean;
}