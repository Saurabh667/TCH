import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth";

const ResetPass = () => {
const { uid, token } = useParams();
const navigate = useNavigate();

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");


const handleSubmit = async (e) => {
e.preventDefault();

setMessage("");
setError("");


if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
}

if (password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
}

setLoading(true);

try {

    const response = await resetPassword(uid, token, password);


    setMessage(response.message);
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
        navigate("/login");
    }, 2000);

} catch (err) {

    const backendMessage = err.response?.data?.message;

    setError(
        Array.isArray(backendMessage)
            ? backendMessage.join(" ")
            : backendMessage || "Unable to reset password."
    );

} finally {
    setLoading(false);
}

};


return (
    <div className="reset-password-page">

        <div className="reset-password-card">

            <h2>Reset Password</h2>

            <p>
                Create a new password for your TCH account.
            </p>

            <form onSubmit={handleSubmit}>

                <label>New Password</label>

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirm Password</label>

                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPass;
