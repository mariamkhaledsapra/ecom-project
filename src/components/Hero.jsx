import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 bg-blend-overlay">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold max-md:text-4xl text-accent-content">
            The best B2B product exchange store of the year!
          </h1>
          <p className="py-6 text-1xl max-md:text-lg text-accent-content">
            Our website is distinguished by serving suppliers and dealers in
            Egypt and helping dealers and manufacturers to communicate and
            exchange products with each other to support local companies..
          </p>
          <Link
            to="/shop"
            className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white"
          >
            join us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero