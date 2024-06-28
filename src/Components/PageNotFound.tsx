
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pagenotfound.css';

const PageNotFound: React.FC = () => {
    return (
        <div className="page-not-found-container">
            <main className="page-not-found-main">
                <h1 className="title-error-page">404</h1>
                <p className="subtitle-error-page">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="home-button">Go Back Home</Link>
            </main>
        </div>
    );
}

export default PageNotFound;
