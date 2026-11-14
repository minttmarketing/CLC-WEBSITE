
import React from 'react';
import { getMapsUrl } from '../../data/centresData';

export default function CentreCard({ centre, delay = 0 }) {
  const cleanPhone = String(centre.phone || '').replace(/\s+/g, '');

  return (
    <div
      className="col-md-6 col-lg-4 centre-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <article className="centre-card__content h-100">

        <div className="centre-card__top">
          <span className="centre-card__location">
            <i className="bi bi-geo-alt-fill"></i>
            {centre.area}
          </span>

          {centre.id === 'nerul' && (
            <span
              className="centre-card__badge"
              aria-label="Head Office"
            >
              <i className="bi bi-star-fill me-1"></i>
              Head Office
            </span>
          )}
        </div>

        <h3>{centre.name}</h3>

        <div className="centre-card__address">
          <i className="bi bi-pin-map-fill"></i>
          <p>{centre.address}</p>
        </div>

        <div className="centre-card__timing">
          <i className="bi bi-clock"></i>
          <div>
            <span>Opening Hours</span>
            <strong>{centre.timing}</strong>
          </div>
        </div>

        <div className="centre-card__actions">
          <a
            className="btn centres-directions-btn"
            href={getMapsUrl(centre)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${centre.name}`}
          >
            <i className="bi bi-map me-2"></i>
            Directions
          </a>

          {cleanPhone && (
            <a
              className="btn centres-call-btn"
              href={`tel:${cleanPhone}`}
              aria-label={`Call ${centre.name}`}
            >
              <i className="bi bi-telephone me-2"></i>
              Call
            </a>
          )}
        </div>

      </article>
    </div>
  );
}
