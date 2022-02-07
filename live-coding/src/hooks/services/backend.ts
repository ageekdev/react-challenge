// Hooks
import { useApiBackend } from "@hooks/services/useApi"
import { useCallback } from "react"

// Misc
import { wait } from "@app/utilities"

type defaultState = {
    loading: boolean
    error: string | null
}

export type TypeProductListData = {
    id: string
    name: string
    price: number
}

export type TypeProductListState = defaultState & {
    data: TypeProductListData[]
}

export type TypePaymentState = defaultState & {
    data: any
}

export type TypePaymentRequest = {
    paymentInfo: {
        email: string
        cardInfo: {
            cardNo: string
            cardExpiryDate: string
            cardCVV: string
        }
    }
    products: {
        id: string
        quantity: number
    }[]
}

export const getProductList = () => {
    const defaultState: TypeProductListState = {
        loading: false,
        data: [],
        error: null,
    }

    const { Request, state, setState, successResolver, isCancel } =
        useApiBackend<TypeProductListState>(defaultState)

    const fetch = useCallback(
        async (payload = {}) => {
            // On Request state
            setState((old: any) => ({
                ...old,
                loading: true,
                error: defaultState.error,
            }))

            // Api request
            const Api = Request({
                method: "get",
                url: `/products`,
                params: payload,
            })
                .then(successResolver)
                // Success
                .then((data = defaultState.data) => {
                    setState((old: any) => ({
                        ...old,
                        data: data.data.products,
                    }))
                })
                // Error
                .catch((err) => {
                    // Return cancelled error immediately
                    if (isCancel(err)) return err

                    setState((old: any) => ({
                        ...old,
                        error: err?.response?.data?.message || err.message,
                    }))
                })

            // Do not proceed when request is cancelled
            if (isCancel(await Api)) return

            // After Request state
            setState((old: any) => ({
                ...old,
                loading: false,
            }))
        },
        [setState]
    )

    return {
        state,
        fetch,
    }
}

export const postPayment = () => {
    const defaultState: TypePaymentState = {
        loading: false,
        data: [],
        error: null,
    }

    const { state, setState, Request, successResolver, isCancel } =
        useApiBackend<TypePaymentState>(defaultState)

    const post = useCallback(
        async (payload: TypePaymentRequest) => {
            // On Request state
            setState((old: any) => ({
                ...old,
                loading: true,
                error: defaultState.error,
            }))

            // Api request
            const Api = Request({
                method: "post",
                url: `/pay`,
                data: { ...payload, requestId: "xxx" },
            })
                .then(successResolver)
                // Success
                .then((data = defaultState.data) => {
                    setState((old: any) => ({
                        ...old,
                        data: data.data,
                        loading: false,
                    }))
                })
                // Error
                .catch((err) => {
                    // Return cancelled error immediately
                    if (isCancel(err)) return err

                    setState((old: any) => ({
                        ...old,
                        error: err?.response?.data?.message || err.message,
                        loading: false,
                    }))
                })

            // Do not proceed when request is cancelled
            if (isCancel(await Api)) return
        },
        [setState]
    )

    return {
        state,
        post,
    }
}
