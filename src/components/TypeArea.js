import { React, useState } from 'react';

const TypeArea = ({ checkAnswer }) => {
	const [inputUser, setInputUser] = useState('');

	const onSubmitInput = (event) => {
		event.preventDefault();
		checkAnswer(inputUser);
		setInputUser('');
	};

	return (
		<div className="typearea">
			<form onSubmit={onSubmitInput}>
				<input
					type="text"
					className="typearea__input"
					value={inputUser}
					placeholder="Type answer in hiragana"
					onChange={(event) => setInputUser(event.target.value)}
					autoComplete="off"
				/>
			</form>
		</div>
	);
};

export default TypeArea;
