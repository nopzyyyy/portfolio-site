import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGalleryStore } from '../stores/galleryStore';
import StarRating from '../components/StarRating';
import { ArrowLeft, MessageSquare, Calendar, Star } from 'lucide-react';

const PhotoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photos, addRating, addComment } = useGalleryStore();
  
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [nameError, setNameError] = useState('');
  const [commentError, setCommentError] = useState('');
  
  const photo = photos.find(p => p.id === id);
  
  if (!photo) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Photo not found</h1>
        <p className="mb-6">The photo you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Back to Gallery
        </button>
      </div>
    );
  }
  
  const getAverageRating = (): number => {
    if (photo.ratings.length === 0) return 0;
    const sum = photo.ratings.reduce((acc, curr) => acc + curr.value, 0);
    return Math.round((sum / photo.ratings.length) * 10) / 10;
  };
  
  const handleRatingChange = (value: number) => {
    addRating(photo.id, value);
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!comment.trim()) {
      setCommentError('Comment is required');
      isValid = false;
    } else {
      setCommentError('');
    }
    
    if (isValid) {
      addComment(photo.id, name, comment);
      setName('');
      setComment('');
    }
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="container mx-auto max-w-5xl px-4 pb-20">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Gallery
      </button>
      
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            {photo.title}
          </h1>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {photo.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center">
              <Calendar size={18} className="text-neutral-500 dark:text-neutral-400 mr-2" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {formatDate(photo.createdAt)}
              </span>
            </div>
            
            {photo.ratings.length > 0 && (
              <div className="flex items-center bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span className="text-primary-700 dark:text-primary-300 font-medium">
                  {getAverageRating()} ({photo.ratings.length} {photo.ratings.length === 1 ? 'rating' : 'ratings'})
                </span>
              </div>
            )}
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
              <Star size={20} className="mr-2" />
              Rate this photo
            </h2>
            <div className="mb-2">
              <StarRating onChange={handleRatingChange} />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Click on a star to leave your rating
            </p>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
              <MessageSquare size={20} className="mr-2" />
              Comments ({photo.comments.length})
            </h2>
            
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input ${nameError ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Enter your name"
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{nameError}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="comment" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`textarea ${commentError ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Share your thoughts about this photo"
                />
                {commentError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{commentError}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Comment
              </button>
            </form>
            
            {photo.comments.length > 0 ? (
              <div className="space-y-4">
                {photo.comments.map((c) => (
                  <div 
                    key={c.id} 
                    className="p-4 bg-neutral-50 dark:bg-neutral-800/70 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-neutral-900 dark:text-white">
                        {c.name}
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDate(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;