"use client";
import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            console.log(username, password, result);

            if (result?.error) {
                setError('Login failed. Please check your credentials.');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('An error occurred during login:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Email input */}
            <div className="form-outline mb-4">
                <input
                    type="text"
                    id="form2Example1"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
                <label className="form-label" htmlFor="form2Example1">Email address</label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="form2Example2"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>

            {/* 2 column grid layout for inline styling */}
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    {/* Checkbox */}
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="form2Example31" />
                        <label className="form-check-label" htmlFor="form2Example31">Remember me</label>
                    </div>
                </div>

                <div className="col">
                    {/* Simple link */}
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

            {/* Register buttons */}
            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                {/* Removed the social media buttons to keep it simple */}
            </div>
        </form>
    );
};

export default SignIn;
