export type account = {
    id: number | null;
    comapnyId: number;
    username: string;
    password: string;
    roleId: number;
}

export type paper = {
    id: number | null;
    companyId: number;
    name: string;
    gsm: number;
}

export type paperSize = {
    id: number | null;
    paperId: number;
    width: number;
    height: number;
    price: number;
}

export type paperPrice = {
    id: number | null;
    paperSizeId: number;
    price: number;
}

export type category = {
    id: number | null;
    companyId: number;
    name: string;
}

export type processing = {
    id: number | null;
    categoryId: number;
    name: string;
    price: number;
}

export type company = {
    id: number | null;
    name: string;
    phone: string;
    address: string;
    taxcode: string;
    email: string;
    type: string;
}

export type paperResponse = {
    id: number | null;
    companyId: number;
    name: string;
    gsm: number;
    paperSizes: {
        paperId: number;
        width: number;
        height: number;
        price: number;
    }[];
}

export type printPrice = {
    id: number | null;
    companyId: number;
    name: string;
    price: number;
    isActive: boolean;
}

export type calculate = {
    widthProduct: number | null;
    heightProduct: number | null;
    quantity: number | null;
    processingIds: any[];
    paperId: number | null;
    paperSizeId: number | null;
    companyId: number | null;
    printPrice: number | null;
    profit: number | null;
    discount: number | null;
}

export type profitRequest = {
    id: number | null;
    companyId: number | null;
    name: string;
    percentage: number | null;
}

export type discountRequest = {
    id: number | null;
    companyId: number | null;
    name: string;
    discount: number | null;
}