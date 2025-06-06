const FinalPage = ({onFinish}) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 to-red-100 flex flex-col items-center justify-center p-6 text-center text-rose-800">
            <h1 className="text-3xl font-bold mb-6">💌 My Final Message to You</h1>

            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full text-lg text-left leading-relaxed">
                <p>
                    My darling, every moment with you is a line in the most beautiful poem ever written. From our first texts to each tiny smile, hug, and memory — I treasure it all in my heart. You're the sunshine that makes everything just right, and I thank the universe every day for you.
                </p>
                <p className="mt-4">
                    This birthday surprise was just a tiny way to show how much you mean to me. I hope it brought a smile to your face. 😊
                </p>

                <p className="mt-4">
                    Again, HAPPPYYY BIRTHDAYYYYYYYYY 🎂🥳🥳
                </p>

                <p className="font-bold text-sm text-center font-mono mt-5">I LOVEEEEEEEEEEEEEEEEEEEEE YOUUUUUUUUUUUUU ❤️❤️❤️♾️</p> 
            </div>
            <div className="flex mt-2 items-center justify-center gap-1">
                <p>If you want to play a little game </p> <button onClick={()=>onFinish()} className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer">Click Here! 🥰</button>
            </div>
        </div>
    );
};

export default FinalPage;
