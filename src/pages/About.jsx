import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">
          We love our customers!
        </h2>
        <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
          We at B2B Marketing understand the importance of cooperation and
          solidarity between companies, especially in these difficult economic
          times. Our website aims to provide an interactive and reliable
          platform that brings together similar or complementary companies, to
          enhance business partnerships and achieve common success. Through our
          website, companies can find potential partners for cooperation in
          diverse areas such as partnership marketing, product development,
          resource exchange, and more. We strive to provide a safe and efficient
          environment for businesses to connect and build strong business
          relationships that benefit everyone. Take advantage of our website
          today and join the partner network striving for success and
          sustainable growth. Contact us now for more information or to start
          exploring opportunities.
        </p>
        <Link
          to="/contact"
          className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
