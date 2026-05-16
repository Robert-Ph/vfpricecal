const ones = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
];

const readTriple = (number: number): string => {
    const hundred = Math.floor(number / 100);
    const ten = Math.floor((number % 100) / 10);
    const unit = number % 10;

    let result = "";

    if (hundred > 0) {
        result += ones[hundred] + " trăm";

        if (ten === 0 && unit > 0) {
            result += " linh";
        }
    }

    if (ten > 1) {
        result += (result ? " " : "") + ones[ten] + " mươi";

        if (unit === 1) {
            result += " mốt";
        } else if (unit === 5) {
            result += " lăm";
        } else if (unit > 0) {
            result += " " + ones[unit];
        }
    } else if (ten === 1) {
        result += (result ? " " : "") + "mười";

        if (unit === 5) {
            result += " lăm";
        } else if (unit > 0) {
            result += " " + ones[unit];
        }
    } else if (unit > 0) {
        result += (result ? " " : "") + ones[unit];
    }

    return result.trim();
};

export const numberToVietnameseText = (num: number): string => {
    if (num === 0) return "Không đồng";

    const units = ["", " nghìn", " triệu", " tỷ"];

    let result = "";
    let i = 0;

    while (num > 0) {
        const part = num % 1000;

        if (part > 0) {
            const prefix = readTriple(part);

            result = prefix + units[i] + " " + result;
        }

        num = Math.floor(num / 1000);
        i++;
    }

    result = result.trim();

    return result.charAt(0).toUpperCase() + result.slice(1) + " đồng";
};