import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IssueForm from '../components/IssueForm';
import Issue from '../components/Issue';
import Spinner from '../components/Spinner';
import { listIssues, reset } from '../features/issues/issueSlice';

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
	}, [user, navigate, isError, message, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

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
							<Link to={`/issues/${issue._id}`} key={issue._id}>
								<Issue key={issue._id} issue={issue} />
							</Link>
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
