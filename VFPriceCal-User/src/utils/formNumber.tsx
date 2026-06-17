export const formatNumber = (num?: number | null): string => { 
    if (num == null) return ""; 
    return new Intl.NumberFormat("fr-FR").format(num); 
};