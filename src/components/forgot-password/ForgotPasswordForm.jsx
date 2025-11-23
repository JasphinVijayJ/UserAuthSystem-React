import { useEffect, useState } from "react";
import InputField from "../common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiCall } from "./forgotPasswordApi";

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordForm() {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "UserAuthSystem | Forgot Password";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [step, setStep] = useState(1);  // 1: Email, 2: OTP, 3: Reset Password

  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const newErrors = {};

    const trimmedEmail = formData.email.trim();
    const trimmedOtp = formData.otp.trim();
    const trimmedNewPassword = formData.newPassword.trim();
    const trimmedConfirmNewPassword = formData.confirmNewPassword.trim();

    if (step === 1) {
      // Email validation for step 1
      if (touched.email && !trimmedEmail) {
        newErrors.email = "Email is required.";
      } else if (touched.email && !emailPattern.test(trimmedEmail)) {
        newErrors.email = "Invalid email format.";
      }
      // Check if email is valid AND email field is filled
      setCanSubmit(Object.keys(newErrors).length === 0 && trimmedEmail.length > 0);
    }
    else if (step === 2) {
      // OTP validation for step 2
      if (touched.otp && !trimmedOtp) {
        newErrors.otp = "OTP is required.";
      } else if (touched.otp && trimmedOtp.length !== 6) {
        newErrors.otp = "OTP must be 6 digits.";
      }
      // Check if OTP is valid AND OTP field is filled
      setCanSubmit(Object.keys(newErrors).length === 0 && trimmedOtp.length === 6);
    }
    else if (step === 3) {
      // Password validation for step 3
      if (touched.newPassword && !trimmedNewPassword) {
        newErrors.newPassword = "New password is required.";
      } else if (touched.newPassword && trimmedNewPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters.";
      }

      if (touched.confirmNewPassword && !trimmedConfirmNewPassword) {
        newErrors.confirmNewPassword = "Please confirm your new password.";
      } else if (touched.confirmNewPassword && trimmedNewPassword !== trimmedConfirmNewPassword) {
        newErrors.confirmNewPassword = "Passwords do not match.";
      }

      // Check if all password fields are valid and filled
      setCanSubmit(
        Object.keys(newErrors).length === 0 &&
        trimmedNewPassword.length > 0 &&
        trimmedConfirmNewPassword.length > 0
      );
    }

    setErrors(newErrors);
  }, [formData, touched, step]);

  // Handle Send OTP (Step 1)
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsLoading(true);
    setErrors({});

    const result = await apiCall(API_ENDPOINTS.FORGOT_PASSWORD, {
      email: formData.email.trim()
    });

    if (!result.ok) {
      setErrors({ submit: result.data.message || result.error });
      setIsLoading(false);
      return;
    }

    alert(result.data.message);
    setStep(2); // Move to OTP verification step
    setIsLoading(false);
  };

  // Handle Verify OTP (Step 2)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsLoading(true);
    setErrors({});

    const result = await apiCall(API_ENDPOINTS.VERIFY_OTP, {
      email: formData.email.trim(),
      otp: formData.otp.trim()
    });

    if (!result.ok) {
      setErrors({ submit: result.data.message || result.error });
      setIsLoading(false);
      return;
    }

    alert(result.data.message);
    setStep(3); // Move to reset password step
    setIsLoading(false);
  };

  // Handle Reset Password (Step 3)
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsLoading(true);
    setErrors({});

    const result = await apiCall(API_ENDPOINTS.RESET_PASSWORD, {
      email: formData.email.trim(),
      newPassword: formData.newPassword.trim(),
      confirmNewPassword: formData.confirmNewPassword.trim()
    });

    if (!result.ok) {
      setErrors({ submit: result.data.message || result.error });
      setIsLoading(false);
      return;
    }

    alert(result.data.message);
    setIsLoading(false);
    // Redirect to login page after successful password reset
    navigate("/login");
  };

  // Handle form submission based on current step
  const handleSubmit = (e) => {
    if (step === 1) handleSendOtp(e);
    else if (step === 2) handleVerifyOtp(e);
    else if (step === 3) handleResetPassword(e);
  };

  // Go back to previous step
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setFormData(prev => ({ ...prev, otp: "" }));
      setErrors({});
      setTouched(prev => ({ ...prev, otp: false }));
    }
    else if (step === 3) {
      setStep(2);
      setFormData(prev => ({ ...prev, newPassword: "", confirmNewPassword: "" }));
      setErrors({});
      setTouched(prev => ({ ...prev, newPassword: false, confirmNewPassword: false }));
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <h2 className="heading-1">Forgot Password</h2>

      {/* Step 1: Send OTP */}
      {step === 1 && (
        <>
          <p>Enter your email address to receive a password reset OTP.</p>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your registered email"
            onChange={handleChange}
          />

          <p className="error-message">{errors.email}</p>

          <button className="button-1" type="submit" disabled={!canSubmit || isLoading}>
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <>
          <p>Enter the 6-digit OTP sent to your email: <strong>{formData.email}</strong></p>

          <InputField
            label="OTP"
            type="text"
            name="otp"
            value={formData.otp}
            placeholder="Enter 6-digit OTP"
            onChange={handleChange}
          />

          <p className="error-message">{errors.otp}</p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="button-1" onClick={handleBack} disabled={isLoading}
              style={{ flex: 1, backgroundColor: '#6c757d' }}
            >
              Back
            </button>
            <button className="button-1" type="submit" disabled={!canSubmit || isLoading}
              style={{ flex: 1 }}
            >
              {isLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        </>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <>
          <p>Set your new password for: <strong>{formData.email}</strong></p>

          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            placeholder="Enter new password"
            onChange={handleChange}
          />
          <p className="error-message">{errors.newPassword}</p>

          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            placeholder="Confirm new password"
            onChange={handleChange}
          />
          <p className="error-message">{errors.confirmNewPassword}</p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="button-1" onClick={handleBack} disabled={isLoading}
              style={{ flex: 1, backgroundColor: '#6c757d' }}
            >
              Back
            </button>
            <button className="button-1" type="submit" disabled={!canSubmit || isLoading}
              style={{ flex: 1 }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </>
      )}

      <p className="error-message">{errors.submit}</p>

      <Link to={"/login"}>Back to Login</Link>
    </form>
  );
}

export default ForgotPasswordForm