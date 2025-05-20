import React from 'react';
import './Footer.css';
import { useContent } from '../../context/Content';
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import youtube from "../../images/youtube.png";
import linkedin from "../../images/linkedin.png";

const iconMap: Record<string, string> = {
    facebook,
    instagram,
    twitter,
    x: twitter,
    youtube,
    linkedin,
};

const Footer: React.FC = () => {
    const { footerSection, loading, error } = useContent();

    if (loading) return <footer className="footer-container">Loading…</footer>;
    if (error || !footerSection)
        return <footer className="footer-container error">Couldn’t load footer</footer>;

    const {
        findTitle,
        addressLine1,
        addressLine2,
        mapLink,
        contactTitle,
        contactPhone,
        contactHours,
        contactEmail,
        socialLinks,
        copyrightText,
    } = footerSection[0];

    return (
        <footer className="footer-container">
            <div className="footer-col">
                <h4 className="footer-heading">{findTitle}</h4>
                <div className="footer-address">
                    <div>{addressLine1}</div>
                    <div>{addressLine2}</div>
                </div>
                <a href={mapLink} className="footer-link">
                    View on map
                </a>
            </div>

            <div className="footer-col">
                <h4 className="footer-heading">{contactTitle}</h4>
                <div className="footer-contact">
                    <a href={`tel:${contactPhone}`} className="footer-link">
                        {contactPhone}
                    </a>
                    <div className="footer-hours">{contactHours}</div>
                </div>
                <a href={`mailto:${contactEmail}`} className="footer-link">
                    {contactEmail}
                </a>
            </div>

            <div className="footer-col">
                <h4 className="footer-heading">Follow us</h4>
                <div className="footer-social">
                    {socialLinks.map(({ platform, url }) => {
                        const key = platform.toLowerCase();
                        const src = iconMap[key];
                        return src ? (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                                title={platform}
                            >
                                <img
                                    src={src}
                                    alt={platform}
                                    className="footer-social-img"
                                />
                            </a>
                        ) : null;
                    })}
                </div>
                <div className="footer-copy">{copyrightText}</div>
            </div>
        </footer>
    );
};

export default Footer;
