import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	/***
	 * If user is logged in then the navigate component will only show Logout
	 * else it will show Login and Register
	 *
	 *
	 */
	return (
		<header className='header'>
			<div className='logo'>
				<Link to={'/'}>BugBlitz</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn' onClick={handleLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to={'/login'}>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to={'/register'}>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};

export default Header;
