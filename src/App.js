import './scss/Style.scss';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Kanji from './components/Kanji';
import Counter from './components/Counter';
import TypeArea from './components/TypeArea';
import { randomItem, shuffleArray } from './components/utils/utils';

function App() {
	const kanjiListRef = useRef([]);
	const [currentKanji, setCurrentKanji] = useState();
	const [remainingChance, setRemainingChance] = useState(5);
	const goodAnswersRef = useRef(0);

	const fetchKanji = async () => {
		try {
			const response = await fetch('./kanji1.json');
			const data = await response.json();
			shuffleArray(data);
			return data.slice(0, 10);
		} catch (error) {
			alert(error);
		}
	};

	const getKanji = () => {
		const kanjis = [];
		fetchKanji().then((res) => {
			res.forEach((element) => {
				kanjis.push(element);
			});
			kanjiListRef.current = kanjis;
			setCurrentKanji(randomItem(kanjis));
		});
	};

	useEffect(() => {
		getKanji();
	}, []);

	const checkAnswer = (answer) => {
		if (answer === currentKanji.reading) {
			goodAnswersRef.current = goodAnswersRef.current + 1;
			kanjiListRef.current = kanjiListRef.current.filter(
				(prevActions) => prevActions.word !== currentKanji.word
			);
			if (kanjiListRef.current.length > 0) {
				setCurrentKanji(randomItem(kanjiListRef.current));
				setRemainingChance(5);
			} else if (kanjiListRef.current.length <= 0) {
				setCurrentKanji([]);
				alert(`You got ${goodAnswersRef.current} good answers.`);
				reset();
			}
		} else {
			setRemainingChance((remainingChance) => remainingChance - 1);
			if (remainingChance <= 1) {
				kanjiListRef.current = kanjiListRef.current.filter(
					(prevActions) => prevActions.word !== currentKanji.word
				);
				if (kanjiListRef.current.length > 0) {
					setCurrentKanji(randomItem(kanjiListRef.current));
					setRemainingChance(5);
				} else if (kanjiListRef.current.length <= 0) {
					setCurrentKanji([]);
					alert(`You got ${goodAnswersRef.current} good answers.`);
					reset();
				}
			} else {
				return;
			}
		}
	};

	const reset = () => {
		setRemainingChance(5);
		getKanji();
		goodAnswersRef.current = 0;
	};

	return (
		<div className="kanji-app">
			<Header />
			<Kanji currentKanji={currentKanji} counterChance={remainingChance} />
			<Counter counterChance={remainingChance} />
			<TypeArea checkAnswer={checkAnswer} />
		</div>
	);
}

export default App;
