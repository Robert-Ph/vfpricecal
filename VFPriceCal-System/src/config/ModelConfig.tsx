export type companiesStatus = {
    id: number;
    code: string;
    name: string;
}

export type Companies = {
    id: string;
    code: string;
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
}

export type createCompany = {
    id: string;
    code: string;
    name: string;
    phone: string;
    address: string;
    taxCode: string;
    email: string;
    statusId: string;
    logoUrl: string;
    createAt: string;
    updateAt: string;
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
    fullName: string;
    name: string;
    phone: string;
    address: string;
    taxCode: string;
    email: string;
    status: string;
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