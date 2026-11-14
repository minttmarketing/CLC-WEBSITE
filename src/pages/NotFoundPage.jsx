import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main id="main" className="section section--white text-center">
      <div className="container">
        <h1 className="h2 mb-3">Page not found</h1>
        <p className="lead text-muted mb-4">The page you are looking for does not exist or has moved.</p>
        <Link className="btn btn-clc" to="/">Back to home</Link>
      </div>
    </main>
  );
}
