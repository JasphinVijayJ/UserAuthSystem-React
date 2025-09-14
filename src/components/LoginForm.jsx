import { useEffect, useState } from "react";
import InputField from "./common/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);

    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    // Validate inputs
    useEffect(() => {
        const newErrors = {};

        const trimmedEmail = formData.email.trim();
        const trimmedPassword = formData.password.trim();

        if (touched.email && !emailPattern.test(trimmedEmail)) {
            newErrors.email = "Invalid email format.";
        };
        if (touched.password) {
            if (!trimmedPassword)
                newErrors.password = "Password is required.";
            else if (trimmedPassword.length < 6)
                newErrors.password = "Password must be at least 6 characters.";
        };

        setErrors(newErrors);
        setCanSubmit(Object.keys(newErrors).length === 0 && Object.keys(touched).length > 0);
    }, [formData, touched]);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) return;

        try {
            const response = await fetch("https://userauthsystem-springboot-production.up.railway.app/uas/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                }),
            });

            const fromBackEnd = await response.json(); // backend sends token and plain text

            if (!response.ok) {
                // Backend validation failed → show exact error
                setErrors({ submit: fromBackEnd.message });
                return;
            }

            // Save JWT token in localStorage
            localStorage.setItem("token", fromBackEnd.token);

            // Success → Redirect to home page
            alert(fromBackEnd.message);
            navigate("/home")   // <-- redirect here

        } catch (error) {
            setErrors({ submit: "Error: Server error. Please try again later." });
            console.error("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
            <h2 className="heading-1">Login</h2>

                <InputField label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                />
                <p className="error-message">{errors.email}</p>

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
                <p className="error-message">{errors.password}</p>

                <button className="button-1" type="submit">Login</button>
                <p className="error-message">{errors.submit}</p>

                <Link to={"/register"}>New User? Register</Link>
            </form>
        </>
    )
}
