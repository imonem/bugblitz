import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getIssue, reset } from '../features/issues/issueSlice';
import Spinner from '../components/Spinner';

function IssueDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { issue, isLoading, isError, message } = useSelector(
		(state) => state.issues,
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate('/login');
		}
		dispatch(getIssue(id, user.token));
	}, [user, navigate, isError, message, dispatch, id]);

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
			<h1>Issue: {id}</h1>
			<h3>{new Date(issue.createdAt).toLocaleString('en-US')}</h3>
			<section>
				<p>{issue.text}</p>
			</section>
			<section>
				<p>
					Owner: <em>{user.name}</em>
				</p>
			</section>
		</>
	);
}

export default IssueDetails;
