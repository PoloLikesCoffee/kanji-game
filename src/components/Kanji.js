import { React } from 'react';

const Kanji = ({ currentKanji }) => {
	// if (currentKanji) {
	// 	console.log(currentKanji.word);
	// }

	return (
		<div className="kanji">
			{currentKanji && (
				<div className="kanji__display">{currentKanji.word}</div>
			)}
		</div>
	);
};

export default Kanji;
