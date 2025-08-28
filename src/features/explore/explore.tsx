"use client"

import { useEffect, useState } from "react"
import { Search, Heart, MessageCircle, Play, Copy } from "lucide-react"
import {
  ExploreContainer,
  SearchHeader,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ExploreGrid,
  ExploreImage,
  HoverOverlay,
  EngagementStats,
  StatItem,
  ContentTypeIcon,
  LoadingContainer,
  ExploreItem,
} from "@/components/explore.components"

interface ExploreResponse {
  data: {
    posts: {
      post_id: string
      media: string[]
      caption?: string
      likes_count: number
      comments_count: number
      type?: "photo" | "video" | "carousel"
    }[]
  }
}

export default function ExplorePage() {
  const [items, setItems] = useState<
    {
      post_id: string
      media: string[]
      caption?: string
      likes_count: number
      comments_count: number
      type?: "photo" | "video" | "carousel"
    }[]
  >([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const BASE_URL_BE = process.env.NEXT_PUBLIC_BASE_URL_BE

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("Authentication required")
      setLoading(false)
      return
    }

    fetch(`${BASE_URL_BE}/explore?page=1&limit=15`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch explore posts")
        const data: ExploreResponse = await res.json()
        setItems(data.data.posts)
        setError(null)
      })
      .catch((err) => {
        setError(err.message || "Failed to load explore posts")
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [BASE_URL_BE])

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>
  }

  if (error) {
    return (
      <ExploreContainer>
        <SearchHeader>
          <SearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </SearchHeader>
        <LoadingContainer>{error}</LoadingContainer>
      </ExploreContainer>
    )
  }

  if (items.length === 0) {
    return (
      <ExploreContainer>
        <SearchHeader>
          <SearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </SearchHeader>
        <LoadingContainer>No posts available</LoadingContainer>
      </ExploreContainer>
    )
  }

  return (
    <ExploreContainer>
      <SearchHeader>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </SearchHeader>

      <ExploreGrid>
        {items.map((item, index) => {
          const isLarge = index % 7 === 0
          const isTall = index % 5 === 0 && index % 7 !== 0

          return (
            <ExploreItem key={item.post_id} $isLarge={isLarge} $isTall={isTall}>
              <ExploreImage src={item.media[0] || "/placeholder.svg"} alt={item.caption || "Explore content"} />

              <HoverOverlay>
                <EngagementStats>
                  <StatItem>
                    <Heart size={20} fill="white" />
                    <span>{item.likes_count?.toLocaleString()}</span>
                  </StatItem>
                  <StatItem>
                    <MessageCircle size={20} fill="white" />
                    <span>{item.comments_count}</span>
                  </StatItem>
                </EngagementStats>
              </HoverOverlay>

              {item.type === "video" && (
                <ContentTypeIcon>
                  <Play size={16} fill="white" />
                </ContentTypeIcon>
              )}
              {item.type === "carousel" && (
                <ContentTypeIcon>
                  <Copy size={16} fill="white" />
                </ContentTypeIcon>
              )}
            </ExploreItem>
          )
        })}
      </ExploreGrid>
    </ExploreContainer>
  )
}
