import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm';

const Dashboard = () => {
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user, navigate]);

	return (
		<>
			<section className='heading'>
				<h1>Welcome {user && user.name}</h1>
				<IssueForm />
			</section>
		</>
	);
};

export default Dashboard;
