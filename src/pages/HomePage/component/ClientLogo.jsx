import React from "react";
import Marquee from "react-fast-marquee";

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
  return (
    <div className="  py-10">
      <h2 className="text-center text-primary text-2xl font-semibold mb-12">Trusted by Leading Brands</h2>
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={true}
        direction="left"
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-24">
            <img
              src={logo}
              alt={`client-${index}`}
              className="h-24 w-auto object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogoSlider;
