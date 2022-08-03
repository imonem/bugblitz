function Issue({ issue }) {
	return (
		<div className='issue'>
			<div>{new Date(issue.createdAt).toLocaleString('en-US')}</div>
			<h2>{issue.text}</h2>
		</div>
	);
}

export default Issue;
