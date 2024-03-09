import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
	

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




	const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/check-auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token); // Store the token securely

                // Redirect based on the user role
                if (data.user.role === 'client') {
                    navigate('/client_dashboard'); // Redirect to user dashboard
                } else if (data.user.role === 'advisor') {
                    navigate('/advisor_dashboard'); // Redirect to advisor dashboard
                }
            } else {
                // If login is not successful, show the error to the user
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login request failed:', error);

        }
    };

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							name="Email"
							
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className={styles.input}
						/>
						<input
							type='password' 
							name='password' 
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
							required
							className={styles.input}
						/>
						
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
