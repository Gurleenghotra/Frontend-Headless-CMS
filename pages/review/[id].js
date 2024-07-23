import React from 'react';
import api from '../../lib/api';

const Review = ({ review }) => {
  return (
    <div className="container">
      <h1 className="mt-4">{review.attributes.Title}</h1>
      <p>{review.attributes.content}</p>
      <p><strong>Rating:</strong> {review.attributes.Rating}</p>
      <p><strong>Artist:</strong> {review.attributes.Artist}</p>
      <p><strong>Album:</strong> {review.attributes.Album}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await api.get('/api/songs');
  const reviews = response.data.data;

  const paths = reviews.map(review => ({
    params: { id: review.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await api.get(`/api/songs/${params.id}`);
  const review = response.data.data;

  return {
    props: { review },
  };
}

export default Review;
