import LogoutButton from "../components/common/LogoutButton";

export default function AdminPage() {
    return (
        <div className="homePage">
            <h1>Welcome Admin!</h1>
            <p>You are logged in as an administrator.</p>

            <LogoutButton />
        </div>
    );
}
