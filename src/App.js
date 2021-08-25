import './scss/Style.scss';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Kanji from './components/Kanji';
import Counter from './components/Counter';
import TypeArea from './components/TypeArea';
import EndScreen from './components/EndScreen';
import Answer from './components/Answer';
import { randomItem, shuffleArray } from './components/utils/utils';
import wrong_audio from './assets/wrong.mp3';
import good_audio from './assets/good.mp3';
import buzz_audio from './assets/buzz.mp3';

function App() {
	const [endScreenVisible, setEndScreenVisible] = useState(false);
	const [answerVisible, setAnswerVisible] = useState(false);
	const [answer, setAnswer] = useState();
	const kanjiListRef = useRef([]);
	const [currentKanji, setCurrentKanji] = useState();
	const [remainingChance, setRemainingChance] = useState(5);
	const goodAnswersRef = useRef(0);

	let dataList = './kanji1.json';
	let nbKanji = 10;

	const playAudio = (audio) => {
		new Audio(audio).play();
	};

	const fetchKanji = async () => {
		try {
			const response = await fetch(dataList);
			const data = await response.json();
			shuffleArray(data);
			return data.slice(0, nbKanji);
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
			playAudio(good_audio);
			goodAnswersRef.current = goodAnswersRef.current + 1;
			kanjiListRef.current = kanjiListRef.current.filter(
				(prevActions) => prevActions.word !== currentKanji.word
			);

			if (kanjiListRef.current.length > 0) {
				setCurrentKanji(randomItem(kanjiListRef.current));
				setRemainingChance(5);
			} else if (kanjiListRef.current.length <= 0) {
				setCurrentKanji([]);
				setEndScreenVisible(!endScreenVisible);
			}
		} else {
			if (remainingChance > 1) {
				playAudio(wrong_audio);
				setRemainingChance((remainingChance) => remainingChance - 1);
			} else if (remainingChance <= 1) {
				showAnswer(currentKanji.reading);
				playAudio(buzz_audio);
				kanjiListRef.current = kanjiListRef.current.filter(
					(prevActions) => prevActions.word !== currentKanji.word
				);
				if (kanjiListRef.current.length > 0) {
					setCurrentKanji(randomItem(kanjiListRef.current));
					setRemainingChance(5);
				} else if (kanjiListRef.current.length <= 0) {
					setCurrentKanji([]);
					setEndScreenVisible(!endScreenVisible);
				}
			}
		}
	};

	const reset = () => {
		setRemainingChance(5);
		getKanji();
		goodAnswersRef.current = 0;
	};

	const showAnswer = (prevanswer) => {
		setAnswerVisible(!answerVisible);
		setAnswer(prevanswer);
	};

	return (
		<div className="kanji-app">
			<Header />
			<Kanji currentKanji={currentKanji} counterChance={remainingChance} />
			<Counter counterChance={remainingChance} />
			<TypeArea checkAnswer={checkAnswer} />
			<EndScreen
				endScreenVisible={endScreenVisible}
				nbAnswer={goodAnswersRef.current}
				reset={reset}
				setEndScreenVisible={setEndScreenVisible}
			/>
			<Answer
				answer={answer}
				answerVisible={answerVisible}
				setAnswerVisible={setAnswerVisible}
			/>
		</div>
	);
}

export default App;
