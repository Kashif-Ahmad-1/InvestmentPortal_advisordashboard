import { useState } from 'react'
import './registerpage.css'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';




function Loginpage() {

    // const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
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
                    navigate('/Client_landing'); // Redirect to user dashboard
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
        <div className='register-container'>
            <div className='register-left'>
                <img src='https://us.123rf.com/450wm/topvector/topvector2209/topvector220900965/192918408-financial-advisor-giving-advice-investment-money-market-analysis-management-planning-for-customer.jpg?ver=6'></img>
            </div>
            
            <form onSubmit={handleSubmit} className="register-right">
                <h2> Welcome Back</h2>
                <div className='input-wrapper'>
                    <h4>New User!!!
                        <a href='/register'>   Register Here</a>
                    </h4>
                </div>
                <div className='input-wrapper'>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <div className='input-wrapper'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        required></input>
                </div>
                <div>
                    <button className='register-btn'>SignIn</button>
                </div>
                <hr></hr>

                <div className='gAuth'>
                    <h2>Continue with <span className="google-icon"><FcGoogle /></span></h2>
                </div>
            </form>

        </div>
    );
}

export default Loginpage;