import type {Post } from "../types/Post";
import type { User } from "../types/User";

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alice',
    displayName: 'Alice Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    bio: 'Designer. Coffee addict.',
    followerCount: 1240,
    followingCount: 342,
  },
  {
    id: '2',
    username: 'bob',
    displayName: 'Bob Smith',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    bio: 'Backend dev. Dog person.',
    followerCount: 890,
    followingCount: 112,
  },
  {
    id: '3',
    username: 'carol',
    displayName: 'Carol Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?u=carol',
    bio: 'Photographer. Traveler.',
    followerCount: 15200,
    followingCount: 210,
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: mockUsers[0],
    imageUrl: 'https://picsum.photos/seed/post1/600/600',
    caption: 'Morning coffee and code ☕',
    likeCounter: 42,
    likedByMe: false,
    comments: [],
    createdAt: '2025-01-15T08:30:00Z',
  },
  {
    id: 'p2',
    author: mockUsers[1],
    imageUrl: 'https://picsum.photos/seed/post2/600/600',
    caption: 'Shipped a big refactor today. Feels good.',
    likeCounter: 128,
    likedByMe: true,
    comments: [
      {
        id: 'c1',
        author: mockUsers[2],
        text: 'Congrats! 🎉',
        createdAt: '2025-01-15T09:00:00Z',
      },
    ],
    createdAt: '2025-01-15T08:45:00Z',
  },
  {
    id: 'p3',
    author: mockUsers[2],
    imageUrl: 'https://picsum.photos/seed/post3/600/600',
    caption: 'Golden hour in Lisbon.',
    likeCounter: 892,
    likedByMe: false,
    comments: [],
    createdAt: '2025-01-15T07:00:00Z',
  },
];