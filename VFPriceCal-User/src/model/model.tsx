export type account = {
    id: number | null;
    comapnyId: string;
    username: string;
    password: string;
    roleId: number;
}

export type paper = {
    id: number | null;
    companyId: string;
    name: string;
    gsm: number;
}

// kich thuoc giay
export type paperSize = {
    id: string| null;
    paperId: string;
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
    id:  string | null;
    companyId: string;
    name: string;
    processings: processing[]
}

// processing
export type processing = {
    id: string | null;
    categoryId: string | null;
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

//du lieu tao loai giay moi
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

//du lieu loai hinh in
export type printPrice = {
    id: number | null;
    companyId: string;
    name: string;
    isActive: boolean;
    printPriceRanges: printPriceRanges[];
}

//danh sach loai hinh in
export type printPriceRanges = {
        id: string | null;
        printPriceId: string;
        minLengthCm: number | null;
        maxLengthCm: number | null;
        pricePerMeter: number | null;
}

//du lieu tinh toan
export type calculate = {
    widthProduct: number | null;
    heightProduct: number | null;
    quantity: number | null;
    processingIds: string[];
    paperId: string | null;
    companyId: string | null;
    printPrice: string | null;
    profit: string | null;
    discount: string | null;
}

//bien loi nhuan
export type profitRequest = {
    id: string;
    companyId: string ;
    name: string;
    percentage: number;
    priority: string;
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