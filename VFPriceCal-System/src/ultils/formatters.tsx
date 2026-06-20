export interface CurrencyOptions {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

/**
 * Format tiền tệ
 */
export const formatCurrency = (
    amount: number | string,
    options: CurrencyOptions = {}
): string => {
    const {
        locale = "vi-VN",
        currency = "VND",
        minimumFractionDigits = 0,
        maximumFractionDigits = 0,
    } = options;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(Number(amount));
};

/**
 * Format số
 */
export const formatNumber = (
    value: number,
    locale: string = "vi-VN"
): string => {
    return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format ngày
 * 20/06/2026
 */
export const formatDate = (
    date: Date | string | null | undefined,
    locale: string = "vi-VN"
): string => {
    if (!date) return "--";

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

/**
 * Format giờ
 * 14:30
 */
export const formatTime = (
    date: Date | string | null | undefined,
    locale: string = "vi-VN"
): string => {
    if (!date) return "--";

    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

/**
 * Format ngày giờ
 * 20/06/2026 14:30
 */
export const formatDateTime = (
    date: Date | string | null | undefined,
    locale: string = "vi-VN"
): string => {
    if (!date) return "--";

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

/**
 * Format đầy đủ
 * Thứ 6, 20/06/2026 14:30
 */
export const formatFullDateTime = (
    date: Date | string | null | undefined,
    locale: string = "vi-VN"
): string => {
    if (!date) return "--";

    return new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};