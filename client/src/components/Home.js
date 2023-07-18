import React from "react";
import classes from "./Home.module.css";
import security from "../assets/images/security.png";
import mouse from "../assets/images/mouse.png";
import car from "../assets/images/car.png";

function Home() {
  return (
    <>
      <div
        id="carouselExampleInterval"
        className={`carousel slide ${classes.slides} `}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2500">
            <img src={car} className="d-block w-100" alt="..." />

            <div className="carousel-caption d-none d-md-block ">
              <h1>
                <strong className={`${classes.carouselTitle}`}>
                  Upload Evidence, Make a Difference
                </strong>
              </h1>
              <p className={`${classes.carouselSub}`}>
                Join CrimeBook's Mission to Fight Crime
              </p>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="2500">
            <img src={security} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block ">
              <h1>
                <strong className={`${classes.carouselTitle}`}>
                  End to End encrypted
                </strong>
              </h1>
              <p className={`${classes.carouselSub}`}>
                {" "}
                Blowfish cipher encryption to encrypt your valuable personal
                data.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2500">
            <img src={mouse} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block ">
              <h1>
                <strong className={`${classes.carouselTitle}`}>
                  Anonymity First
                </strong>
              </h1>
              <p className={`${classes.carouselSub}`}>
                Report crimes anonymously without fear of retaliation.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <p className={`display-5 fw-bold ${classes.heading}`}>About Us</p>
      <div className={`${classes.content}`}>
        <span>
          <ul>
            <li>
              At CrimeBook, we are committed to providing a safe and anonymous
              way for individuals to report crimes.
            </li>
            <li>
              Our mission is to aware people and help law enforcement agencies
              identify and solve crimes if needed, while protecting the
              anonymity of the individuals who report them.
            </li>
            <li>
              It is developed by a group of students from Presidency University
              who saw a need for a secure and effective way to report crimes
              without the fear of retaliation.
            </li>
            <li>
              We offer a wide range of services to our users, including a secure
              online reporting system, the ability to upload photos or videos
              related to the crime.
            </li>
            <li>
              Our reporting system is designed to be user-friendly and
              intuitive, so that even individuals with limited technical
              expertise can easily report crimes and provide valuable
              information to make people aware.
            </li>
            <li>
              At CrimeBook, we believe that everyone has a role to play in
              making our communities safer. By using our website to report
              crimes, you can help to make a real difference in the fight
              against crime, and help to ensure that justice is served.
            </li>
            <li>
              We are committed to protecting the anonymity of our users, and to
              providing a safe and secure environment for reporting crimes.
              Thank you for choosing CrimeBook. Together, we can make a
              difference.
            </li>
          </ul>
        </span>
      </div>
      {/* <hr style={{ margine: 0 }} /> */}
      {/* <p className={`display-5 fw-bold ${classes.secondheading}`}>Contact Us</p>
      <div className={`${classes.content}`}>
        <p>
          We're always happy to hear from our users! If you have any questions,
          feedback, or suggestions, please don't hesitate to get in touch with
          us.
          <br />
          <b>Email:</b>
          <br />
          You can email us at{" "}
          <a href="mailto:stopcrime472@gmail.com" className={`${classes.aTag}`}>
            stopcrime472@gmail.com
          </a>
          . We'll do our best to respond to your message as soon as possible.
          <br />
          <b>Phone</b>:<br />
          If you prefer to speak with someone over the phone, you can call us at
          <a href=""> 080 344 223</a>. Our customer service representatives are available 24/7.
          <br />
          <b>Social Media:</b>
          <br />
          You can also reach out to us on social media. Follow us on{" "}
          <a
            className={`${classes.aTag}`}
            href="https://www.facebook.com/profile.php?id=100091779218215&mibextid=ZbWKwL"
          >
            <i className="bi bi-facebook"></i> CrimeBook
          </a>{" "}
          or to{" "}
          <a
            href="https://instagram.com/crimestopper2?igshid=ZDdkNTZiNTM="
            className={`${classes.aTag}`}
          >
            <i className="bi bi-instagram"></i> CrimeBook
          </a>{" "}
          to stay up-to-date with our latest news and updates, and to send us a
          direct message.
          <br />
          <br />
          We value your feedback and are committed to providing the best
          possible experience for our users. Thank you for your support!
        </p>
      </div> */}

      <footer className={`${classes.Homefooter}`}>
        <div className="d-flex justify-content-center gap-5 mb-3 fs-4">
          <a href="mailto:stopcrime472@gmail.com">
            <i className="bi bi-envelope-at-fill"></i>
          </a>
          <a href="/">
            <i className="bi bi-telephone-fill"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100091779218215&mibextid=ZbWKwL">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://instagram.com/crimestopper2?igshid=ZDdkNTZiNTM=">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        © 2023 CrimeBook. All rights reserved
      </footer>
    </>
  );
}

export default Home;
