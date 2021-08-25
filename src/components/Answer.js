import React from 'react';

const Answer = ({ answerVisible, setAnswerVisible, answer }) => {
	const handleClick = () => {
		setAnswerVisible(!answerVisible);
	};

	if (answerVisible) {
		return (
			<div className="answer-container visible">
				<div className="answer-container__content">
					<div className="answer-container__answer">
						The answer was: <span>{answer}</span>.
					</div>
					<button
						className="answer-container__buttonNext"
						onClick={handleClick}
					>
						⊗
					</button>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Answer;
