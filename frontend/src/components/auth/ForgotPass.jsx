import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/auth";

const ForgotPass = () => {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
        const response = await forgotPassword(email);

        setMessage(response.message);
        setEmail("");

    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="forgot-password-page">

        <div className="forgot-password-card">

            <h2>Forgot Password?</h2>

            <p>
                Don't worry! Enter your registered email address
                and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>

                <label>Email Address</label>

                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>

            {message && (
                <p className="success-message">{message}</p>
            )}

            {error && (
                <p className="error-message">{error}</p>
            )}

            <Link to="/login">
                Back to Login
            </Link>

        </div>

    </div>
);

};

export default ForgotPass;
