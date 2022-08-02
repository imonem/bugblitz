import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createIssue } from '../features/issues/issueSlice';

export default function IssueForm() {
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(createIssue({ text }));
	};

	return (
		<section className='form'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='text'>Issue</label>
					<input
						type='text'
						name='text'
						id='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block' type='submit'>
						Add Issue
					</button>
				</div>
			</form>
		</section>
	);
}
