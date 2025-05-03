import React, { useState } from 'react';

const questions = [
    {
        question: "When did I first saw you? 👀",
        options: ["Magh 2079", "Falgun 2079", "Baisakh 2080", "Asar 2080"],
        answer: "Falgun 2079"
    },
    {
        question: "When did I first decided to text you? 💬",
        options: ["24 Dec 2023", "25 Dec 2023", "26 Dec 2023", "27 Dec 2023"],
        answer: "26 Dec 2023"
    },
    {
        question: "What did I say back to you when you first said me Happy Birthday? 😭",
        options: ["Happy Birthday!", "Thank you!", "Welcome!"],
        answer: "Happy Birthday!"
    },
    {
        question: "What did I feel the first time I saw you in a saree? 🥻",
        options: ["Totally in love", "You looked alright", "Couldn't breathe for a second", "Just a normal day"],
        answer: "Couldn't breathe for a second"
    },
    {
        question: "What did we eat in our first \"date\"?🥰",
        options: ["Keema Noodels", "Pizza", "Momo", "Ice-cream"],
        answer: "Keema Noodels"
    },
    {
        question: "What's my favorite thing about you?💖",
        options: ["Your eyes", "Your voice", "Your smile", "Your presence"],
        answer: "Your eyes"
    },
    {
        question: "What's my favorite thing to do?🤔",
        options: ["To make you smile", "To be drowned in your presence"],
        answer: "To be drowned in your presence"
    },
    {
        question: "Which emoji reminds me of you the most?🤔",
        options: ["😈", "🧸", "🐧", "😇"],
        answer: "🐧"
    },
    {
        question: "When do I miss you the most?😛",
        options: ["While Eating", "While sleeping", "While doing nothing", "Every damn second"],
        answer: "Every damn second"
    },
    {
        question: "When makes me happiest in this world? ❤️",
        options: ["Achieving dreams", "Seeing you win", "Listening to music", "Seeing my club win"],
        answer: "Seeing you win"
    },
    {
        question: "What is my favorite moment with you so far? ❤️",
        options: ["First Hug", "Proposing you", "Every single moment", "First date"],
        answer: "Every single moment"
    }
];

const Quiz = ({ onFinish }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [hover, setHover] = useState(false);
    const handleAnswerClick = (option) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <>
            {
                !clicked && (
                    <div className="min-h-screen w-full text-black bg-pink-100 flex flex-col justify-center items-center p-4 text-center">
                        <p>Now lets do a little quiz session!! Shall we??</p>
                        <div className="btns flex justify-center items-center gap-3 mt-3">
                            <button onClick={() => setClicked(true)} className='p-2 w-12 bg-green-400 hover:bg-green-500 hover:cursor-pointer rounded-2xl'>YES</button>
                            <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='p-2 w-12 bg-red-400 hover:bg-red-500 hover:cursor-not-allowed rounded-2xl'>NO</button>
                            {hover && (
                                <p id='onhover' className='absolute mt-16'>Why are you even thinking? 🤨</p>
                            )}

                        </div>
                    </div>

                )
            }
            {clicked && (
                <div className="min-h-screen w-full text-black bg-pink-100 flex flex-col justify-center items-center p-4 text-center">
                    {!isFinished ? (
                        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
                            <div className="flex flex-col gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(option)}
                                        className="bg-pink-200 hover:bg-pink-300 transition px-4 py-2 rounded-xl"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
                            <h2 className="text-2xl font-bold text-pink-500 mb-4">You finished the quiz! 🎉</h2>
                            <p className="text-lg mb-2">You got {score} out of {questions.length} right!</p>
                            <p className="text-md">Whether you got 0 or 11, you're always my 100/100 💯💖</p>
                            <button onClick={() => onFinish()} className='bg-pink-400 text-white rounded hover:cursor-pointer p-2 mt-2'>Next ⏭️</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Quiz;
