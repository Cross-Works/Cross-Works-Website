import React from 'react';
import './contactpage.css';
import { useContent } from '../../context/Content';

const ContactPage: React.FC = () => {
  const { contactSection, loading, error } = useContent();

  if (loading) {
    return <div className="contact-loading">Loading contact info…</div>;
  }

  if (error || !contactSection) {
    return (
      <div className="contact-error">
        Unable to load contact information.
      </div>
    );
  }

  const { title, description, phoneNumber, contactItems } = contactSection[0];

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left column */}
        <div className="contact-left">
          <h2 className="contact-title">{title}</h2>

          <div className="contact-description">
            {Array.isArray(description)
              ? description.map((block: { children: { text: string; }[]; }, idx: React.Key | null | undefined) => {
                  const text = block.children?.[0]?.text || '';
                  return (
                    <p key={idx} className="contact-paragraph">
                      {text}
                    </p>
                  );
                })
              : <p className="contact-paragraph">{description}</p>
            }
          </div>

          <p className="contact-phone">
            <span className="contact-phone-label">Phone:</span>{' '}
            <a href={`tel:${phoneNumber}`} className="contact-phone-link">
              {phoneNumber}
            </a>
          </p>
        </div>

        {/* Right column */}
        <div className="contact-right contact-links">
          <ul>
            {contactItems.map(item => (
              <li key={item.id} className="contact-link-item">
                <div className="contact-link-label">{item.label}</div>
                <a
                  href={`mailto:${item.email}`}
                  className="contact-link-email"
                >
                  {item.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
