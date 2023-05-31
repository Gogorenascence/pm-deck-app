import { useContext } from "react";
import { Context } from "../Store";
import { Button } from "react-bootstrap";

function Logout() {
    const [token, dispatch] = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const accountsUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token/`;
        const fetchConfig = {
            method: "delete",
            credentials: "include",
        };
        await fetch(accountsUrl, fetchConfig);
        dispatch({ type: "logout" });
        let accountData = {
            id: null,
            email: null,
            username: null,
        };
        dispatch({ type: "update_current", payload: accountData });
        window.location.href = `${process.env.PUBLIC_URL}/`;
    };
    return (
        <>
            <Button onClick={handleSubmit} className="btn btn-primary">
                Log Out
            </Button>
        </>
    );
}
export default Logout;
