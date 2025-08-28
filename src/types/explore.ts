export interface ExploreItem {
  post_id: number
  user_id: number
  username: string
  profile_picture: string | null
  media: string[]
  caption: string | null
  created_at: string
  likes_count: number
  comments_count: number
}

export interface ExploreResponse {
  status: number
  message: string
  data: {
    posts: ExploreItem[]
    pagination: {
      totalPage: number
      totalData: number
      page: number
      offset: number
    }
  }
}
