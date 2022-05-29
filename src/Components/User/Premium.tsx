import { useAppDispatch, useAppSelector } from "hooks";
import { buyPremiumThunk } from "Store/user-actions";
import Paypal from "Components/User/Paypal";

function Premium() {
    const account = useAppSelector((state) => state.user.account);
    const token = useAppSelector((state) => state.user.token);

    const dispatch = useAppDispatch();

    const buyPremiumHandler = () => {
        dispatch(buyPremiumThunk(token))
    }

    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            <h1 className="display-1 text-center">Premium</h1>

            <h4 className="my-5 border-bottom text-center">Brak reklam</h4>
            <h4 className="my-5 border-bottom text-center">Dostęp do limitowanych miejsc</h4>
            <h4 className="my-5 rainbow-text border-bottom text-center">Kolorowy nickname</h4>

            <div className="d-grid gap-2 mt-auto">
                {account?.type === "premium" ? (
                    <h5 className="text-center mb-5">Jesteś użytkownikiem premium</h5>
                ) : (
                    <>
                        {" "}
                        <h5 className="text-center">Już od 9.99 zł miesięcznie</h5>
                        <Paypal />
                    </>
                )}
            </div>
        </div>
    );
}

export default Premium;
