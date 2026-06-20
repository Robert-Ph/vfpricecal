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

export type plans = {
    id: string;
    code: string;
    name: string;
    price: number;
    createAt: string;
    durationInDays: number;
}

   