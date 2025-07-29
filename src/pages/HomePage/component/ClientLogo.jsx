import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";

// Import your logos
import logo1 from "../../../assets/1009.jpg";
import logo2 from "../../../assets/7475870.jpg";
import logo3 from "../../../assets/7533464.jpg";
import logo4 from "../../../assets/8041916.jpg";
import logo5 from "../../../assets/8041916.jpg";
import logo6 from "../../../assets/OIFIUA0.jpg";
import logo7 from "../../../assets/7533464.jpg";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="py-10 bg-gray-50">
      <h2
        className="text-center text-primary text-3xl font-bold mb-14"
        data-aos="fade-down"
      >
        Trusted by Leading Brands
      </h2>
      <Marquee gradient={false} speed={60} pauseOnHover={true} direction="left">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-16 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <img
              src={logo}
              alt={`client-${index}`}
              className="h-24 w-auto object-contain drop-shadow-md"
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogoSlider;
