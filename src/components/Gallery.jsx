import { useState } from 'react';
import Dec26 from '../assets/pictures/dec-26.jpg'
import FirstPhoto from '../assets/pictures/first-photo.jpg';
import FarewellPhoto from '../assets/pictures/farewell-photo.jpg';
import SecondPhoto from '../assets/pictures/second-photo.jpg';
import Photo1 from "../assets/pictures/photo1.jpg";
import ProposePhoto from "../assets/pictures/propose.jpg"
import FirstHug from "../assets/pictures/first-hug.jpg"
import FirstBouquetPhoto from "../assets/pictures/first-bouquet.jpg"
import BirthdayPhoto from "../assets/pictures/my-birthday.jpg"
import PemaPhoto from "../assets/pictures/pema.jpg"
const Gallery = ({onFinish}) => {
    const images = [Dec26, FirstPhoto, FarewellPhoto, SecondPhoto, Photo1, ProposePhoto, FirstHug, FirstBouquetPhoto, BirthdayPhoto, PemaPhoto]
    const captions = [
        "December 26!! The day I first saw you outside of school premises and couldn't resist but to text you!😭",
        "Our first picture together 💖 Both unaware of what we'll write together in the upcoming days!",
        "Our farewell of grade 12, the day I felt in love with you even more, the day I first saw you in Saree (OHH MYY GOODNESSS! 😭)!",
        "Our second photo together, direct in the fresher's welcome program! 💓",
        "Always beautiful my dear! 😍",
        "Jan 1! No words for that beautiful day! 🥰",
        "Our First Hug!! I'll never forget this moment! Your arms feels like the safest place to be, heaven on earth, HOME!🫂🤗",
        "My personal flower with the bouquet, wearing the ring I proposed you with! 💗",
        "Us in my birthday! 🎂",
        "Our first selfie together!!📸"
    ]
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState("next");
    const [start, setStart] = useState(false);
    const [slideEnd, setSlideEnd] = useState(true);
    const nextImage = () => {
        setDirection("next");
        setIndex((prev) => (prev + 1) % images.length);
    };
    const prevImage = () => {
        setDirection("prev");
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    };
    return (
        <div className="h-screen w-full bg-gradient-to-br from-purple-200 to-pink-300 flex flex-col justify-center items-center p-4">
            {
                slideEnd ? (
                    <>
                        <h1 className='font-bold text-2xl font-mono text-amber-800'>Our Mini Photo Gallery</h1>

                        {
                            start ? (
                                <>
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            key={index}
                                            src={images[index]}
                                            alt={`Slide ${index + 1}`}
                                            className={`w-full h-full object-cover transition-transform duration-700 ${direction === "next" ? "translate-x-0 animate-slide-left" : "translate-x-0 animate-slide-right"
                                                }`}
                                        />
                                    </div>

                                    <p
                                        key={`caption-${index}`}
                                        className="text-black text-center mt-4 max-w-xs text-lg transition-opacity duration-700 opacity-0 animate-fade-in"
                                    >
                                        {captions[index]}
                                    </p>

                                    <div className="flex gap-6 mt-4">
                                        <button
                                            onClick={prevImage}
                                            className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer"
                                            disabled={index === 0}
                                        >
                                            ⬅️ Previous
                                        </button>
                                        <button
                                            onClick={index === images.length - 1 ? setSlideEnd(false) : nextImage}
                                            className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 hover:cursor-pointer"
                                        >
                                            {index === images.length - 1 ? "Finish ➡️" : "Next ➡️"}

                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>We may not have many pictures together but, these are our special moments captured! ❤️ </p>
                                    <button onClick={() => setStart(true)} className='bg-green-300 rounded p-2 w-24 mt-4'>Start ➡️</button>
                                </>
                            )
                        }
                    </>) : (
                    <>
                        <div className="text-center text-pink-900 mt-8">
                            <h2 className="text-2xl font-bold">That's a wrap! 🎉</h2>
                            <p className="mt-2">Each picture is a piece of our story. I can't wait to fill many more pages with you. 💞</p>
                            <p className="mt-2 text-sm italic">– With all my love, always.</p>
                            <button onClick={()=> onFinish()} className='bg-pink-400 text-white rounded hover:cursor-pointer p-2 mt-2'>Next ⏭️</button>
                        </div>
                    </>)
            }

        </div>
    );
};

export default Gallery;