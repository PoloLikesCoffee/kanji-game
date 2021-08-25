import React from 'react';

const EndScreen = ({
	endScreenVisible,
	nbAnswer,
	reset,
	setEndScreenVisible,
}) => {
	const handleClick = () => {
		reset();
		setEndScreenVisible(!endScreenVisible);
	};

	if (endScreenVisible) {
		return (
			<div className="end-screen visible">
				<div className="end-screen__content">
					<div className="end-screen__answer">
						You got <span>{nbAnswer}</span> good answers.
					</div>
					<button className="end-screen__button" onClick={handleClick}>
						start again
					</button>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default EndScreen;
