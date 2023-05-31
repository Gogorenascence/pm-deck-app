import Button from "react-bootstrap/Button";
import { useToken } from "../UseToken";

function LogoutButton() {
    const [token, logout] = useToken();

    return (
        <>
            <Button onClick={() => logout}>Logout</Button>
        </>
    );
}
export default LogoutButton;
