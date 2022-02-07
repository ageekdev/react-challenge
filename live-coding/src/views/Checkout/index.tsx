import React, { FC, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useLocation } from "wouter"

// Store
import { RootState } from "@app/store"

// Actions
import { usePageClass } from "@hooks/actions/usePageClass"

// Services
import { postPayment } from "@hooks/services/backend"

// Components Layouts
import LayoutCenter from "@components/layouts/LayoutCenter"

// Blocks
import CheckoutForm, {
    TypeCheckoutFormValues,
} from "@app/components/blocks/CheckoutForm"

// Styled Elements
import {
    Container,
    Title,
    List,
    ProductContent,
    ProductHead,
    ProductLabel,
    Products,
    ProductPrice,
    ProductTotalPrice,
    ProductQuantity,
} from "./index.styled"

type TypeCartItems = {
    id: string
    name: string
    price: number
    qty: number
}[]

export interface InterfaceCheckoutProps {
    BlockName?: string
}

const DefaultBlockName = "PageCheckout"

const PageCheckout: FC<InterfaceCheckoutProps> = ({
    BlockName = DefaultBlockName,
}) => {
    usePageClass({ name: BlockName })

    const [, setLocation] = useLocation()

    const { state, post } = postPayment()

    const CartItems: TypeCartItems = useSelector(
        (state: RootState) => state.cart
    )

    const totalPrice = useMemo(
        () =>
            CartItems.filter((item) => item.qty > 0).reduce(
                (total, { qty, price }) => total + qty * price,
                0
            ),
        [CartItems]
    )

    const onSubmit = (values: TypeCheckoutFormValues) => {
        post({
            paymentInfo: {
                cardInfo: {
                    cardNo: `${values.card_number}`,
                    cardCVV: `${values.cvv}`,
                    cardExpiryDate: `${values.card_expire}`,
                },
                email: `${values.email}`,
            },
            products: CartItems.map((product) => ({
                id: product.id + "",
                quantity: product.qty,
            })),
        })
    }

    // Redirect on empty cart
    useEffect(() => {
        if (!CartItems.length) {
            setLocation("/")
            toast.error("Empty products. Please add some.")
        }
    }, [CartItems])

    useEffect(() => {
        if (!state.loading && typeof state.data === "object" && state.error) {
            // has error
            toast.success(state.error)
        }
        if (
            !state.loading &&
            typeof state.data === "object" &&
            state.data.requestId
        ) {
            // successful
            setLocation("/")
            toast.success("Payment successful")
        }
    }, [state])

    return (
        <LayoutCenter>
            <Container>
                <Title>Checkout</Title>

                <List>
                    {CartItems.map(({ id, name, price, qty }) => (
                        <Products key={id}>
                            <ProductHead />

                            <ProductContent>
                                <ProductLabel>{name}</ProductLabel>
                                <ProductPrice>
                                    {price.toLocaleString()} MMK
                                </ProductPrice>
                            </ProductContent>

                            <ProductContent>
                                <ProductTotalPrice>
                                    {(price * qty).toLocaleString()} MMK
                                </ProductTotalPrice>

                                <ProductQuantity>qty: {qty}</ProductQuantity>
                            </ProductContent>
                        </Products>
                    ))}
                </List>

                <CheckoutForm
                    onSuccess={onSubmit}
                    submitText={`Pay ${totalPrice.toLocaleString()} MMK`}
                    loading={state.loading}
                />
            </Container>
        </LayoutCenter>
    )
}

export default PageCheckout
