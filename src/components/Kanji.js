import { React } from 'react';

const Kanji = ({ currentKanji, counterChance }) => {
	let motivation = counterChance === 3 ? 'やればできる！' : 'がんばれ！';

	let meaningTip =
		counterChance === 1
			? `Hint: '${currentKanji.meaning}'.`
			: 'まだ終わっていないです。';

	let hint = counterChance <= 2 ? meaningTip : motivation;

	let displayHint = counterChance === 5 ? '' : hint;

	return (
		<div className="kanji">
			{currentKanji && currentKanji.meaning && (
				<>
					<div className="kanji__hint">{displayHint}</div>
					<div className="kanji__display">{currentKanji.word}</div>
				</>
			)}
		</div>
	);
};

export default Kanji;
