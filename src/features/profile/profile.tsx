"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Header,
  ProfileSection,
  ProfileImage,
  UserInfo,
  TopRow,
  Username,
  EditButton,
  FollowButton,
  MoreButton,
  Stats,
  Stat,
  StatNumber,
  StatLabel,
  Bio,
  FullName,
  TabsContainer,
  Tab,
  PostsGrid,
  Post,
  PostImage,
  PostOverlay,
  PostStats,
  LoadingContainer,
  NoPostsContainer,
  NoPostsIcon,
  NoPostsText,
} from "@/components/profile.component";

import {
  Heart,
  MessageCircle,
  Grid3X3,
  Bookmark,
  Tag,
  Settings,
} from "lucide-react";

interface UserProfile {
  id: number;
  username: string;
  fullname: string | null;
  profilePicture: string | null;
  bio: string | null;
  totalFollowers: number;
  totalFollowing: number;
}

interface PostItem {
  id: number;
  media: string[];
  likes?: number;
  comments?: number;
}

export default function InstagramProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [page, setPage] = useState(1);
  const limit = 12;

  const router = useRouter();
  const BASE_URL_BE = process.env.NEXT_PUBLIC_BASE_URL_BE;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${BASE_URL_BE}/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router, BASE_URL_BE]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setPostsLoading(true);

    fetch(`${BASE_URL_BE}/posts/me/posts?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        setPosts(data.data.posts || []);
        setTotalPosts(data.data.totalPosts || 0);
        setPostsLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setTotalPosts(0);
        setPostsLoading(false);
      });
  }, [page, BASE_URL_BE]);

  if (loading) {
    return (
      <LoadingContainer>
        <div>Loading profile...</div>
      </LoadingContainer>
    );
  }

  if (!user) return null;

  return (
    <Container>
      <Header>
        <ProfileSection>
          <ProfileImage
            src={
              user.profilePicture ||
              "/placeholder.svg?height=150&width=150&query=default profile avatar"
            }
            alt={user.username}
          />
          <UserInfo>
            <TopRow>
              <Username>{user.username}</Username>
              <EditButton>Edit profile</EditButton>
              <FollowButton>View archive</FollowButton>
              <MoreButton>
                <Settings size={24} />
              </MoreButton>
            </TopRow>

            <Stats>
              <Stat>
                <StatNumber>{totalPosts}</StatNumber>
                <StatLabel>posts</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.totalFollowers.toLocaleString()}</StatNumber>
                <StatLabel>followers</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.totalFollowing.toLocaleString()}</StatNumber>
                <StatLabel>following</StatLabel>
              </Stat>
            </Stats>

            {user.fullname && <FullName>{user.fullname}</FullName>}
            {user.bio && <Bio>{user.bio}</Bio>}
          </UserInfo>
        </ProfileSection>
      </Header>

      <TabsContainer>
        <Tab
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          <Grid3X3 size={12} /> POSTS
        </Tab>
        <Tab
          active={activeTab === "saved"}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark size={12} /> SAVED
        </Tab>
        <Tab
          active={activeTab === "tagged"}
          onClick={() => setActiveTab("tagged")}
        >
          <Tag size={12} /> TAGGED
        </Tab>
      </TabsContainer>

      {postsLoading ? (
        <LoadingContainer>
          <div>Loading posts...</div>
        </LoadingContainer>
      ) : posts.length === 0 ? (
        <NoPostsContainer>
          <NoPostsIcon>📷</NoPostsIcon>
          <NoPostsText>No Posts Yet</NoPostsText>
        </NoPostsContainer>
      ) : (
        <PostsGrid>
          {posts.map((post) => (
            <Post key={post.id}>
              <PostImage src={post.media[0]} alt={`Post ${post.id}`} />
              <PostOverlay>
                <PostStats>
                  <div>
                    <Heart size={20} fill="white" />
                    <span>{post.likes ?? 0}</span>
                  </div>
                  <div>
                    <MessageCircle size={20} fill="white" />
                    <span>{post.comments ?? 0}</span>
                  </div>
                </PostStats>
              </PostOverlay>
            </Post>
          ))}
        </PostsGrid>
      )}
    </Container>
  );
}
