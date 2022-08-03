import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IssueForm from '../components/IssueForm';
import Issue from '../components/Issue';
import Spinner from '../components/Spinner';
import { listIssues } from '../features/issues/issueSlice';
import { reset } from '../features/auth/authSlice';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { issues, isLoading, isError, message } = useSelector(
		(state) => state.issues,
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate('/login');
		}
		dispatch(listIssues());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>Welcome {user && user.name}</h1>
			</section>
			<IssueForm />
			<section className='content'>
				{issues.length > 0 ? (
					<div className='issues'>
						{issues.map((issue) => (
							<Issue key={issue._id} issue={issue} />
						))}
					</div>
				) : (
					<h3>No issues here</h3>
				)}
			</section>
		</>
	);
};

export default Dashboard;
