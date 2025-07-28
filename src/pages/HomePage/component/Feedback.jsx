import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxoisSecure";
import ReactStars from "react-rating-stars-component";
import { useMediaQuery } from "react-responsive";
import StarRatings from 'react-star-ratings';

const FeedbackCarousel = () => {
  const axiosSecure = useAxiosSecure();

  // Screen breakpoints using react-responsive
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });

  // Determine chunk size based on screen
  const chunkSize = isMobile ? 1 : isTablet ? 2 : 3;

  // Get feedbacks
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["all-feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  // Divide feedbacks into chunks based on chunkSize
  const chunkedFeedbacks = [];
  for (let i = 0; i < feedbacks.length; i += chunkSize) {
    chunkedFeedbacks.push(feedbacks.slice(i, i + chunkSize));
  }

  return (
    <div className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        What Students Say
      </h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={6000}
        transitionTime={700}
        emulateTouch
        swipeable
      >
        {chunkedFeedbacks.map((group, index) => (
          <div
            key={index}
            className={`grid gap-6 ${chunkSize === 1
                ? "grid-cols-1"
                : chunkSize === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } px-4`}
          >
            {group.map((fb) => (
              <div
                key={fb._id}
                className="bg-[#2B1D3A] text-white p-6 rounded-3xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  
                 <div className="flex items-center justify-between w-full px-2">
  {/* Left-side quote */}
  <p className="text-4xl text-white">“</p>

  {/* Right-side rating */}
  <StarRatings
    rating={fb.rating || 0}
    starRatedColor="#ffd700"
    numberOfStars={5}
    name='rating-display'
    starDimension="20px"
    starSpacing="2px"
  />
</div>

                  <p className="text-sm text-gray-200 leading-relaxed">
                    {fb.description.length > 160
                      ? fb.description.slice(0, 160) + "..."
                      : fb.description}
                  </p>



                  <div className="flex items-center justify-center gap-4 mt-4">
                    <img
                      src={fb.photo || "/default-user.png"}
                      alt={fb.name}
                      className="w-14 h-14 rounded-full border-2 border-purple-500 shadow-md"
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-white">{fb.name}</h3>
                      <p className="text-sm text-gray-300">{fb.title}</p>
                    </div>
                    <span className="ml-auto bg-purple-600 text-white text-xs px-3 py-1 rounded-lg">
                      Batch 9
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeedbackCarousel;
