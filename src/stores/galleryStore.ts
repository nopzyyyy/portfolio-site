import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  width: number;
  height: number;
  createdAt: string;
  ratings: Rating[];
  comments: Comment[];
}

export interface Rating {
  id: string;
  value: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
}

interface GalleryState {
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, 'id' | 'ratings' | 'comments' | 'createdAt'>) => void;
  deletePhoto: (id: string) => void;
  addRating: (photoId: string, value: number) => void;
  addComment: (photoId: string, name: string, text: string) => void;
}

// Sample photos data
const samplePhotos: Photo[] = [
  {
    id: '1',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain landscape at sunset',
    imageUrl: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg',
    width: 800,
    height: 1200,
    createdAt: new Date().toISOString(),
    ratings: [{ id: '1', value: 5, createdAt: new Date().toISOString() }],
    comments: [{ id: '1', name: 'Sarah', text: 'Amazing composition!', createdAt: new Date().toISOString() }]
  },
  {
    id: '2',
    title: 'Urban Architecture',
    description: 'Modern urban architecture in black and white',
    imageUrl: 'https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg',
    width: 800,
    height: 1000,
    createdAt: new Date().toISOString(),
    ratings: [{ id: '1', value: 4, createdAt: new Date().toISOString() }],
    comments: [{ id: '1', name: 'Michael', text: 'Love the contrast', createdAt: new Date().toISOString() }]
  },
  {
    id: '3',
    title: 'Beach Sunset',
    description: 'Golden sunset over a tranquil beach',
    imageUrl: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg',
    width: 1200,
    height: 800,
    createdAt: new Date().toISOString(),
    ratings: [{ id: '1', value: 5, createdAt: new Date().toISOString() }],
    comments: [{ id: '1', name: 'Alex', text: 'What a beautiful moment!', createdAt: new Date().toISOString() }]
  },
  {
    id: '4',
    title: 'Forest Path',
    description: 'Mystical path through a dense forest',
    imageUrl: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg',
    width: 800,
    height: 1400,
    createdAt: new Date().toISOString(),
    ratings: [],
    comments: []
  },
  {
    id: '5',
    title: 'City Lights',
    description: 'Vibrant city lights at night',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    width: 1200,
    height: 800,
    createdAt: new Date().toISOString(),
    ratings: [],
    comments: []
  },
  {
    id: '6',
    title: 'Drone View',
    description: 'Aerial view of a coastline',
    imageUrl: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    width: 1000,
    height: 900,
    createdAt: new Date().toISOString(),
    ratings: [],
    comments: []
  }
];

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set) => ({
      photos: samplePhotos,
      addPhoto: (photo) => set((state) => ({
        photos: [
          ...state.photos,
          {
            ...photo,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ratings: [],
            comments: []
          }
        ]
      })),
      deletePhoto: (id) => set((state) => ({
        photos: state.photos.filter(photo => photo.id !== id)
      })),
      addRating: (photoId, value) => set((state) => ({
        photos: state.photos.map(photo => 
          photo.id === photoId
            ? {
                ...photo,
                ratings: [...photo.ratings, { 
                  id: Date.now().toString(),
                  value,
                  createdAt: new Date().toISOString() 
                }]
              }
            : photo
        )
      })),
      addComment: (photoId, name, text) => set((state) => ({
        photos: state.photos.map(photo => 
          photo.id === photoId
            ? {
                ...photo,
                comments: [...photo.comments, { 
                  id: Date.now().toString(),
                  name,
                  text,
                  createdAt: new Date().toISOString() 
                }]
              }
            : photo
        )
      })),
    }),
    {
      name: 'gallery-storage',
    }
  )
);