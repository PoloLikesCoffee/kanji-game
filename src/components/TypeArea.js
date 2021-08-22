import { React, useState } from 'react';

const TypeArea = ({ currentKanji, checkAnswer }) => {
	const [inputUser, setInputUser] = useState('');
	// if (currentKanji) {
	// 	console.log(currentKanji.reading);
	// }

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
