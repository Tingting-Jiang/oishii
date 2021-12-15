import React from "react";
import Header from "../Header";
import {Helmet} from "react-helmet";
import './terms.css';

const PrivacyPolicy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | Oishii</title>
            </Helmet>

            <div className="container mt-2">
                <Header active=""/>

                <hr className="wd-color-coral"/>

                <div>
                    <ul className="nav d-flex d-block d-lg-none">
                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/send-feedback">Send Feedback</a>
                        </li>
                    </ul>
                </div>

                <div className="row">
                    <ul className="nav flex-column mt-3 d-none d-lg-block col-3">

                        <li className="nav-item">
                            <a className="nav-link" href="/terms-of-service">Terms of Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/send-feedback">Send Feedback</a>
                        </li>

                    </ul>
                    <div className="mt-2 col-12 col-lg-9">
                        <div>
                            <h1 className="text-center my-3 wd-terms-title fw-bold text-black">Privacy Policy for
                                Oishii</h1>
                            <p>Oishii is a website for searching, sharing and creating recipes. In Oishii, we value the
                                privacy of each user. This Privacy Policy document contains types of information that is
                                collected and recorded by Oishii and how we use it.</p>
                            <p>If you have additional questions or require more information about our Privacy Policy, do
                                not
                                hesitate to contact us.</p>
                            <p>This Privacy Policy applies only to our online activities and is valid for visitors to
                                our
                                website with regards to the information that they shared and/or collect in Oishii. This
                                policy
                                is not applicable to any information collected offline or via channels other than this
                                website.
                            </p>
                            <h2 className="wd-terms-title">Consent</h2>
                            <p>By using our website, you hereby consent to our Privacy Policy and agree to its
                                terms.</p>
                            <h2 className="wd-terms-title">Information we collect</h2>
                            <p>When you register for an Account, Oishii only requires you provide a username and a
                                password. You may provide other personal information as you register, but it would not
                                have any effect on your experience on Oishii.
                            </p>
                            <p>
                                We will collect your dining interests such as what recipes you are interested in, and
                                your user relationships with other users when you submit these information.
                            </p>

                            <p>If you contact us directly, we may receive additional information about you such as your
                                name,
                                email address, phone number, the contents of the message and/or attachments you may send
                                us, and
                                any other information you may choose to provide.</p>

                            <h2 className="wd-terms-title">How we use your information</h2>
                            <p>We use the information we collect in various ways, including to:</p>
                            <ul>
                                <li>Provide, operate, and maintain our website</li>
                                <li>Improve, personalize, and expand our website</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Develop new products, services, features, and functionality</li>
                            </ul>
                            <h2 className="wd-terms-title">Log Files</h2>
                            <p>Oishii follows a standard procedure of using log files. These files log visitors when
                                they visit
                                websites. All hosting companies do this as part of hosting services' analytics. The
                                information collected by log files include internet protocol (IP) addresses, browser
                                type,
                                Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly
                                the
                                number of clicks. These are not linked to any information that is personally
                                identifiable. The
                                purpose of the information is for analyzing trends, administering the site, tracking
                                users'
                                movement on the website, and gathering demographic information.</p>
                            <h2 className="wd-terms-title">Cookies and Web Beacons</h2>
                            <p>Like any other website, Oishii uses 'cookies'. These cookies are used to store
                                information
                                including visitors' preferences, and the pages on the website that the visitor accessed
                                or
                                visited. The information is used to optimize the users' experience by customizing our
                                web page
                                content based on visitors' browser type and/or other information.</p>
                            <p>For more general information on cookies, please read <a
                                href="https://www.generateprivacypolicy.com/#cookies">the Cookies article on Generate
                                Privacy
                                Policy website</a>.</p>
                            <h2 className="wd-terms-title">Advertising Partners Privacy Policies</h2>
                            <p>You may consult this list to find the Privacy Policy for each of the advertising partners
                                of
                                Oishii.</p>
                            <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web
                                Beacons
                                that are used in their respective advertisements and links that appear on Oishii, which
                                are sent
                                directly to users' browser. They automatically receive your IP address when this occurs.
                                These
                                technologies are used to measure the effectiveness of their advertising campaigns and/or
                                to
                                personalize the advertising content that you see on websites that you visit.</p>
                            <p>Note that Oishii has no access to or control over these cookies that are used by
                                third-party
                                advertisers.</p>
                            <h2 className="wd-terms-title">Third Party Privacy Policies</h2>
                            <p>Oishii's Privacy Policy does not apply to other advertisers or websites.</p>
                            <p>You can choose to disable cookies through your individual browser options. To know more
                                detailed
                                information about cookie management with specific web browsers, it can be found at the
                                browsers'
                                respective websites.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}

export default PrivacyPolicy;