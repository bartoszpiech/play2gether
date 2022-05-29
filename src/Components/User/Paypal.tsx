import React, { useState, useRef, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "hooks";
import { buyPremiumThunk } from "Store/user-actions";

interface productInterface {
    price: number;
    description: string;
}

export default function Paypal() {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const account = useAppSelector((state) => state.user.account);
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();


    const product: productInterface = {
        price: 9.99, // 9,99pln
        description: "Jednorazowa opłata premium w portalu Play2Gether", // opis na paypalu
    };

    useEffect(() => {
        window.paypal
        .Buttons({
            createOrder: (data: any, actions: any) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                currency_code: 'PLN',
                                value: product.price,
                            },
                        },
                    ],
                });
            },
            onApprove : async (data: any, actions: any) => {
                const order = await actions.order.capture();
                setPaidFor(true);
                //console.log(order);
                dispatch(buyPremiumThunk(token));
            },
            onError: (err: any) => {
                setError(err);
                console.error(err);
            },
        })
        .render(paypalRef.current);
    }, [product.description, product.price]);

    if (paidFor) {
        return(
            <div>
                <h1>Dziękujemy za kupno premium na naszym portalu!</h1>
            </div>
        );
    }

    return(
        <div>
            { error && <div>Ups, wystąpił błąd</div> }
            <div ref={ paypalRef } />
        </div>
    );
}
