import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useProfileStore } from '../stores/profileStore';
import { useGalleryStore } from '../stores/galleryStore';
import { Table as Tabs, User, Image, Trash2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();
  const { photos, addPhoto, deletePhoto } = useGalleryStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [cryptoAddress, setCryptoAddress] = useState(profile.cryptoAddress);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidth, setImageWidth] = useState(800);
  const [imageHeight, setImageHeight] = useState(600);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!bio.trim()) newErrors.bio = 'Bio is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    updateProfile({
      name,
      email,
      bio,
      cryptoAddress
    });
    
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };
  
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addPhoto({
      title,
      description,
      imageUrl,
      width: imageWidth,
      height: imageHeight
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImageWidth(800);
    setImageHeight(600);
    
    setSuccess('Photo added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };
  
  return (
    <div className="container mx-auto max-w-4xl px-4 pb-20">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
        Admin Panel
      </h1>
      
      <div className="card overflow-hidden">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-primary-700 dark:text-primary-300 border-b-2 border-primary-500'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <User size={18} className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'photos'
                ? 'text-primary-700 dark:text-primary-300 border-b-2 border-primary-500'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Image size={18} className="mr-2" />
            Photos
          </button>
        </div>
        
        <div className="p-6">
          {success && (
            <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg">
              {success}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="bio" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`textarea ${errors.bio ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="cryptoAddress" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Crypto Address (for donations)
                </label>
                <input
                  id="cryptoAddress"
                  type="text"
                  value={cryptoAddress}
                  onChange={(e) => setCryptoAddress(e.target.value)}
                  className="input"
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Profile
              </button>
            </form>
          )}
          
          {activeTab === 'photos' && (
            <div>
              <form onSubmit={handleAddPhoto} className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Add New Photo
                </h2>
                
                <div className="mb-4">
                  <label 
                    htmlFor="title" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="description" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`textarea ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="imageUrl" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={`input ${errors.imageUrl ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="https://images.pexels.com/photos/123456/pexels-photo-123456.jpeg"
                  />
                  {errors.imageUrl && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.imageUrl}</p>
                  )}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Tip: Use high-quality images from Pexels or similar sites for best results
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label 
                      htmlFor="imageWidth" 
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Width (px)
                    </label>
                    <input
                      id="imageWidth"
                      type="number"
                      value={imageWidth}
                      onChange={(e) => setImageWidth(parseInt(e.target.value))}
                      className="input"
                      min="100"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="imageHeight" 
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                    >
                      Height (px)
                    </label>
                    <input
                      id="imageHeight"
                      type="number"
                      value={imageHeight}
                      onChange={(e) => setImageHeight(parseInt(e.target.value))}
                      className="input"
                      min="100"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Photo
                </button>
              </form>
              
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Manage Photos ({photos.length})
                </h2>
                
                {photos.length === 0 ? (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No photos in your gallery yet. Add some above!
                  </p>
                ) : (
                  <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {photos.map((photo) => (
                      <div key={photo.id} className="py-4 flex items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-neutral-900 dark:text-white truncate">
                            {photo.title}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                            {photo.description}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => deletePhoto(photo.id)}
                          className="ml-4 p-2 text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 transition-colors"
                          aria-label={`Delete ${photo.title}`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;