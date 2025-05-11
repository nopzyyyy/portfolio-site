import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  cryptoAddress: string;
}

interface ProfileState {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
}

// Default profile data
const defaultProfile: ProfileData = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Passionate photographer and designer with an eye for capturing unique moments. I specialize in portrait and landscape photography.',
  cryptoAddress: '0x1234...5678',
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (data) => set((state) => ({
        profile: { ...state.profile, ...data }
      })),
    }),
    {
      name: 'profile-storage',
    }
  )
);