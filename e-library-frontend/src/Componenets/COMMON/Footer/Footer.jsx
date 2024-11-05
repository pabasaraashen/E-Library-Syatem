import React from "react";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';



const Footer = () => {
    return (
      <div className="footer bg-dark py-5 ">
        <div className="container">
          <div className="row text-center text-md-left">
            
            <div className="col-md-3 col-sm-6 mb-3">
              <h4 className="text-light">Library</h4>
              <ul className="list-unstyled">
                <li><a href="/Vision" className="text-light">Vision</a></li>
                <li><a href="/Volunteer" className="text-light">Volunteer</a></li>
                <li><a href="/Blog" className="text-light">Blog</a></li>
              </ul>
            </div>
  
            <div className="col-md-3 col-sm-6 mb-3">
              <h4 className="text-light">Discover</h4>
              <ul className="list-unstyled">
                <li><a href="/Home" className="text-light">Home</a></li>
                <li><a href="/Collection" className="text-light">Collections</a></li>
                <li><a href="/Return to Top" className="text-light">Return to Top</a></li>
                <li><a href="/Donation" className="text-light">Donation</a></li>
              </ul>
            </div>
  
            <div className="col-md-3 col-sm-6 mb-3">
              <h4 className="text-light">Help</h4>
              <ul className="list-unstyled">
                <li><a href="/Help Center" className="text-light">Help Center</a></li>
                <li><a href="/Report A problem" className="text-light">Report A problem</a></li>
              </ul>
            </div>
  
            <div className="col-md-3 col-sm-6 mb-3">
              <h4 className="text-light">Follow Us</h4>
  
              <div className="justify-content-center justify-content-md-start">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary me-2">
                   <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info me-2">
                   <i className="fab fa-twitter"></i>
                </a>
                <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary me-2">
                   <i className="fab fa-medium-m"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
                   <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
  
          <hr />
  
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-light">© {new Date().getFullYear()} CSboys. All rights reserved.</p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><a href="/terms" className="text-light">Terms & Conditions</a></li>
              <li className="list-inline-item"><a href="/privacy" className="text-light">Privacy</a></li>
              <li className="list-inline-item"><a href="/security" className="text-light">Security</a></li>
              <li className="list-inline-item"><a href="/cookie" className="text-light">Cookie Declaration</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  