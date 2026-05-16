export const formatMoney = (money: number) => {
    return money.toLocaleString("vi-VN").replace(/\./g, " ") + " đ";
};