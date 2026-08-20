export type account = {
    id: string;
    comapnyId: string;
    email: string;
    username: string;
    code: string;
    status: string;
}

export type accountInfo = {
    companyId: string;
    accountId: string;
    email: string;
    username: string;
    password: string;
    roleId: string;
    statusId: string;
}


export type paper = {
    id: string | null;
    companyId: string;
    name: string;
    gsm: number;
}

export type paperList = {
    id: string;
    width: number;
    height: number;
    price: number;
}

export type category = {
    id:  string;
    companyId: string;
    accountId: string;
    name: string;
    canDelete: boolean;
    processings: processing[] | null
}

// processing
export type processing = {
    id: string | null;
    categoryId: string | null;
    name: string;
    unit: string;
}

export type processingCreate = {
    id: string | null;
    categoryId: string;
    companyId: string;
    accountId: string;
    name: string;
    unit: string;
    pTierRequests: processingTier[] | null;
}
export type processingTier = {
    id: string | null;
    processingId: string | null;
    minVolume: number;
    maxVolume: number;
    price: number;
    minCharge: number;
    isActive: boolean;
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

//du lieu tao loai giay moi
export type paperResponse = {
    id: string | null;
    companyId: number;
    name: string;
    gsm: number;
    paperSizes:paperSize[];
}

// kich thuoc giay
export type paperSize = {
    id: string| null;
    paperId: string;
    width: number;
    height: number;
    price: number;
}


//du lieu loai hinh in
export type printPrice = {
    id: string | null;
    companyId: string;
    name: string;
    unit: string;
    isActive: boolean;
    printPriceRanges: printPriceRanges[];
}

//danh sach loai hinh in
export type printPriceRanges = {
        id: string | null;
        printPriceId: string;
        minLengthCm: number | null;
        maxLengthCm: number | null;
        pricePerMeter: number;
}

//du lieu tinh toan
export type calculate = {
    accoutId: string;
    widthProduct: number | null;
    heightProduct: number | null;
    productInPage: number | null;
    quantity: number | null;
    processingIds: proCal[];
    paperId: string | null;
    paperSizeId: string | null;
    companyId: string | null;
    printPrice: string | null;
    profit: string | null;
    discount: string | null;
    
}

export type proCal = {
    id: string;
    name: string;
}

//bien loi nhuan
export type profitRequest = {
    id: string;
    companyId: string ;
    name: string;
    priority: string;
    itemList: profitItem[];
}

export type profitItem = {
    profitId: string;
    name: string;
    percent: number;
}

export type profitRespone = {
    id: string;
    companyId: string ;
    name: string;
    priority: string;
    itemList: profitItemReponse[];
}

export type profitItemReponse = {
    id: string
    profitId: string;
    name: string;
    percent: number;
}

// chiec khau khach hang
export type discountRequest = {
    id: number | null;
    companyId: string ;
    name: string;
    isActive: boolean;
    priority: string;
    discountRanges: discountRanges[]
    
}

// danh sach chiec khau
export type discountRanges = {
        id: string;
        discountId: string;
        maxAmount: number;
        discount: number;
}

export type mobile = {
    companyId: string;
    papers:{
        id: string;
        name: string;
        paperSizes: {
            id: string;
            width: number;
            height: number;
        }[];
    }[];
    categories: {
        id: string;
        name: string;
        processings:{
            id: string;
            name: string;
        }[];
    }[];
    printPrices: {
        id: string;
        name: string;
        price: number
    }[]
}

export type result = {
    price: number;
    quantityPaper: number;
    productSheet: number;
    paperSize: string;
    processingCost: number;
    discount: number;
    paperCost: number;
    cost: number;
}

export type companyInfo = {
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
    createAt: string;
    startTime: string;
    endTime: string;
    updateAt: string;
    priceMonth: number;
}


export type updateCompany = {
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

export type roles = {
    id: string;
    name: string;
    description: string;
}

export type log = {
    id: string;
    level: string;
    action: string;
    accountName: string;
    content: string;
    status: string;
    createAt: string;
}

export type LogRequest = {
    id: string;
    companyId: string;
}