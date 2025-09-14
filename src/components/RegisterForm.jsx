import { useEffect, useState } from "react";
import InputField from "./common/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {

    const navigate = useNavigate(); // ✅ for redirection

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);

    // Regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    // Validate form on every change
    useEffect(() => {
        const newErrors = {};

        const trimmedName = formData.name.trim();
        const trimmedPhone = formData.phone.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPassword = formData.password.trim();
        const trimmedConfirmPassword = formData.confirmPassword.trim();

        if (touched.name && !trimmedName)
            newErrors.name = "Name is required.";
        if (touched.phone && !phonePattern.test(trimmedPhone))
            newErrors.phone = "Phone must be 10 digits.";
        if (touched.email && !emailPattern.test(trimmedEmail))
            newErrors.email = "Invalid email format.";
        if (touched.password) {
            if (!trimmedPassword)
                newErrors.password = "Password is required.";
            else if (trimmedPassword.length < 6)
                newErrors.password = "Password must be at least 6 characters.";
        }
        if (touched.confirmPassword && trimmedPassword !== trimmedConfirmPassword)
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        setCanSubmit(Object.keys(newErrors).length === 0 && Object.keys(touched).length > 0);
    }, [formData, touched]);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return; // Stop if form not valid

        // Trim all fields before sending
        const finalFormData = {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
            confirmPassword: formData.confirmPassword.trim(),
        };

        try {
            const response = await fetch("https://userauthsystem-springboot-production.up.railway.app/uas/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalFormData)
            });

            const fromBackEnd = await response.text(); // backend returns plain message

            if (!response.ok) {
                // Backend validation failed → show exact error
                setErrors({ submit: fromBackEnd });
                return;
            }
            // Success → Redirect to login page
            alert(fromBackEnd);
            navigate("/login");   // <-- redirect here

        } catch (error) {
            setErrors({ submit: "Error: Server error. Please try again later." });
            console.error("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <h2 className="heading-1">Register</h2>

                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                />
                <p className="error-message">{errors.name || ""}</p>

                <InputField
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                />
                <p className="error-message">{errors.phone}</p>

                <InputField
                    label="Email"
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

                <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                />
                <p className="error-message">{errors.confirmPassword}</p>

                <button className="button-1" type="submit">Register</button>
                <p className="error-message">{errors.submit}</p>

                <Link to={"/login"}>Already have an account? Login</Link>
            </form>
        </>
    )
}
