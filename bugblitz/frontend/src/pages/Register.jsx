import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});

	const { name, email, password, passwordConfirmation } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth,
	);

	/**Fire up useEffect with the dependency list if any is true then reset the state
	 *if isSuccess or user is true, navigate the user to the Dashboard at root
	 *isError is true then display the message
	 * dispatch otherwise
	 */
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset);
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	//onChange handles the form entries events
	const onChange = (e) => {
		setformData((previousState) => ({
			...previousState,
			[e.target.name]: e.target.value,
		}));
	};

	/**onSubmit handles checking password confirmation then
	 * sending the userData object to register using dispatch
	 *
	 * */
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== passwordConfirmation) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				Create a new account
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Please enter your name'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Please enter your email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Please enter your password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='passwordConfirmation'
							name='passwordConfirmation'
							value={passwordConfirmation}
							placeholder='Please confirm your password'
							onChange={onChange}
						/>
					</div>
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
