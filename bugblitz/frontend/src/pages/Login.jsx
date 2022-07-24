import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
	const [formData, setformData] = useState({
		email: '',
		password: '',
	});

	let { email, password } = formData;

	const onChange = (e) => {
		setformData((previousState) => ({
			...previousState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				Go and kill bugs!
			</section>
			<section className='form'>
				<form className='form-group'>
					<input
						type='email'
						className='form-control'
						id='email'
						name='email'
						value={email}
						placeholder='Please enter your email'
						onChange={onChange}
					/>
					<input
						type='password'
						className='form-control'
						id='password'
						name='password'
						value={password}
						placeholder='Please enter your password'
						onChange={onChange}
					/>
				</form>
				<div className='form-group'>
					<button type='submit' className='btn btn-block' onSubmit={onSubmit}>
						Submit
					</button>
				</div>
			</section>
		</>
	);
};

export default Login;
