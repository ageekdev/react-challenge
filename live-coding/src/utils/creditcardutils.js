export const validateCardNumber = (cardNo) => {
    // Accept exactly 16 digits
    return RegExp("^[0-9]{16}$").test(cardNo)
}

export const validateExpDate = (expDate) => {
    return (
        RegExp("^[0-9]{2}/[0-9]{2}$").test(expDate) &&
        Number(expDate.slice(0, 2)) <= 12
    )
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

export const getCardType = (cardNo) => {
    const visaRegex = RegExp("^4[0-9]{12}(?:[0-9]{3})?$")
    const masterRegex = RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$")

    if (visaRegex.test(cardNo)) {
        return "visa"
    }
    if (masterRegex.test(cardNo)) {
        return "master"
    }
    return null
}
