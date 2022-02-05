export const validateCardNumber = (cardNo) => {
    // Accept exactly 16 digits
    return RegExp("^[0-9]{16}$").test(cardNo)
}
export const validateExpDate = (expDate) => {
    if (RegExp("^[0-9]{2}/[0-9]{2}$").test(expDate))
        return RegExp("^[0-9]{2}/[0-9]{2}$").test(expDate)
}
export const formatCardNumber = (cardNo) => {
    return cardNo
}
export const formatCardExpiry = (expDate) => {
    return expDate
}
