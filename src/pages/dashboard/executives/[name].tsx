import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
export default function ExecutiveDetailPage() {
    const { name } = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/dashboard/executives');
    };
    return (<>
      <Helmet>
        <title>{name} | Executive Detail | Allora AI</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <button onClick={goBack} className="mb-4 text-blue-500 hover:underline">
          &larr; Back to Executives
        </button>
        <h1 className="text-3xl font-bold mb-6">{name} Executive Profile</h1>
        <p>This page is under development. Executive profiles will be available soon.</p>
      </div>
    </>);
}
