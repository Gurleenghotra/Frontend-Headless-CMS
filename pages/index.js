import React, { useState } from 'react';
import Link from 'next/link';
import api from '../lib/api';

const Home = ({ reviews = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = reviews.filter(review =>
    review.attributes.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Reviews</h1>
      <input
        type="text"
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search reviews..."
      />
      <ul className="list-group">
        {filteredReviews.map(review => (
          <li key={review.id} className="list-group-item">
            <Link href={`/review/${review.id}`}>
              <p>{review.attributes.Title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await api.get('/api/songs');
    const reviews = response.data.data; // Extract the array from the 'data' field

    return {
      props: { reviews: Array.isArray(reviews) ? reviews : [] },
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      props: { reviews: [] },
    };
  }
}

export default Home;
