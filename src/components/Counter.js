import React from 'react';

const Counter = ({ counterChance }) => {
	return (
		<div className="counter">
			<div className="counter__title">
				remaining chances:{' '}
				<div className="counter__display">{counterChance}/5</div>
			</div>
		</div>
	);
};

export default Counter;
