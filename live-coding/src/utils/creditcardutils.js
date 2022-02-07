export const validateCardNumber = (cardNo) => {
    // Accept exactly 16 digits
    return RegExp("^[0-9]{16}$").test(cardNo)
}
export const validateExpDate = (expDate) => {
    return RegExp("^[0-9]{2}/[0-9]{2}$").test(expDate)
}
export const formatCardNumber = (cardNo) => {
    return cardNo
}
export const formatCardExpiry = (expDate) => {
    if (
        expDate &&
        expDate.length > 1 &&
        !expDate.split("").find((el) => el === "/")
    ) {
        return expDate.slice(0, 2) + "/" + expDate.slice(2)
    }
    return expDate
}
