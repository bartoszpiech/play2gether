import Paypal from "Components/User/Paypal";
import { useAppSelector } from "hooks";

function Premium() {
    const account = useAppSelector((state) => state.user.account);

    return (
        <div className="container-fluid d-flex flex-column rounded-3 shadow my-xl-5 my-0 p-5">
            <h1 className="display-1 text-center">Premium</h1>

            <h4
                className={`${
                    account?.type === "premium" ? "my-5" : "my-2"
                } border-bottom text-center`}
            >
                Brak reklam
            </h4>
            <h4
                className={`${
                    account?.type === "premium" ? "my-5" : "my-2"
                } border-bottom text-center`}
            >
                Dostęp do limitowanych miejsc
            </h4>
            <h4
                className={`${
                    account?.type === "premium" ? "my-5" : "my-2"
                } rainbow-text border-bottom text-center`}
            >
                Kolorowy nickname
            </h4>

            <div className="d-grid gap-2 mt-auto">
                {account?.type === "premium" ? (
                    <h2 className="text-center mb-5">Jesteś użytkownikiem premium, dziękujemy!</h2>
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
