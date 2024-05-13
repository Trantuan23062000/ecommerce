import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/banner2.jpeg",
    "/images/banner3.jpeg",
    "/images/banner4.jpeg",
  ];
  const [content, setContent] = useState({
    title: "Best collection for home decoration",
    buttonText: "Shop Now",
    linkTo: "/shop", // Đường dẫn mặc định
  });

  // Hàm xử lý chuyển hướng khi nhấn vào nút
  const handleButtonClick = () => {
    window.location.href = content.linkTo; // Chuyển hướng đến đường dẫn được cấu hình
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (currentImageIndex) {
      case 0:
        setContent({
          title: "Best collection Update summer trends",
          buttonText: "Shop Now",
          linkTo: "/shop", 
        });
        break;
      case 1:
        setContent({
          title: "Discover new trends break all limits",
          buttonText: "Explore Now",
          linkTo: "/explore", // Đường dẫn đến trang khám phá
        });
        break;
      case 2:
        setContent({
          title: "Meticulous attention to every design step",
          buttonText: "Get Inspired",
          linkTo: "/inspiration", // Đường dẫn đến trang cảm hứng
        });
        break;
      case 3:
        setContent({
          title: "Create your with our products",
          buttonText: "Start Shopping",
          linkTo: "/start", // Đường dẫn đến trang bắt đầu
        });
        break;
      default:
        setContent({
          title: "Best collection Update summer trends",
          buttonText: "Shop Now",
          linkTo: "/shop",
        });
    }
  }, [currentImageIndex]);

  return (
    <div
    className="relative bg-cover bg-no-repeat bg-center py-36 md:py-96  "
    style={{
      backgroundImage: `url('${images[currentImageIndex]}')`,
    }}
  >
    <div className="absolute inset-x-0 bottom-0 pb-8 text-center">
      <h1 className="text-6xl md:text-6xl text-yellow-300 font-medium mb-4 capitalize transform transition-transform duration-500 hover:-translate-y-1">
        {/* {content.title} */}
      </h1>
      <div className="inline-block">
        <div className="inline-block">
          <button
            className="bg-black border-2 text-white px-6 md:px-12 uppercase font-serif hover:text-yellow-400 py-3 md:py-6 font-medium rounded-xl transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            onClick={handleButtonClick}
          >
            {content.buttonText}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Banner;
