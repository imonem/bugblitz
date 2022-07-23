import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const Register = () => {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	let { name, email, password, passwordConfirmation } = formData;

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
					<FaUser /> Register
				</h1>
				Create a new account
			</section>
			<section className='form'>
				<form className='form-group'>
					<input
						type='text'
						className='form-control'
						id='name'
						name='name'
						value={name}
						placeholder='Please enter your name.'
						onChange={onChange}
					/>
					<input
						type='email'
						className='form-control'
						id='email'
						name='email'
						value={email}
						placeholder='Please enter your email.'
						onChange={onChange}
					/>
					<input
						type='password'
						className='form-control'
						id='password'
						name='password'
						value={password}
						placeholder='Please enter your password.'
						onChange={onChange}
					/>
					<input
						type='password'
						className='form-control'
						id='passwordConfirmation'
						name='passwordConfirmation'
						value={passwordConfirmation}
						placeholder='Please confirm your password.'
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

export default Register;
