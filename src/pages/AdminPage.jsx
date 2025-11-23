import { useEffect } from "react";
import LogoutButton from "../components/common/LogoutButton";

export default function AdminPage() {

    useEffect(() => {
        document.title = "UserAuthSystem | Admin Dashboard";
    }, []);

    return (
        <div className="homePage">
            <h1>Welcome Admin!</h1>
            <p>You are logged in as an administrator.</p>

            <LogoutButton />
        </div>
    );
}
