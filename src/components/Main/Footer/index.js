import React from "react";
import './footer.css';

const Footer = () => {

    return (
        <div className="wd-footer">
            <div>
                <h3>Oishii</h3>
                <p>Presented by Project Oishii Group</p>
                <span>
                    <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                        Privacy Policy
                    </button>
                </span>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <span>
                    <button type="button" className="btn btn-outline-primary text-body wd-button-transparent p-0" >
                        Send Feedback
                    </button>
                </span>

                <div id="consent-popup" className="hidden">
                    <p>By using this site you agree to our <a href="/termsAndConditions" className="wd-color-coral fw-bold">Terms of Use and Privacy Policy</a>.
                        Please <a id="accept" className="wd-color-coral fw-bold" href="#">Accept</a> before using our website.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;

