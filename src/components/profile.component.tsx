import styled from "styled-components"

export const Container = styled.div`
  max-width: 935px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const Header = styled.header`
  margin-bottom: 28px;
  padding: 0;
`

export const ProfileSection = styled.div`
  display: flex;
  padding: 44px 24px 44px; // increased bottom padding for better spacing without highlights
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px 32px; // increased bottom padding on mobile
  }
`

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 44px;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 24px;
    width: 77px;
    height: 77px;
  }
`

export const UserInfo = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`

export const Username = styled.h1`
  font-size: 28px;
  font-weight: 300;
  color: #262626;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

export const EditButton = styled.button`
  background: transparent;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: 600;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fafafa;
  }
`

export const FollowButton = styled.button`
  background: transparent;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: 600;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fafafa;
  }
`

export const MoreButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #fafafa;
  }
`

export const Stats = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    justify-content: space-around;
    gap: 20px;
    padding: 12px 0;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    margin: 24px -16px;
  }
`

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  @media (min-width: 769px) {
    flex-direction: row;
    gap: 4px;
  }
`

export const StatNumber = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #262626;
`

export const StatLabel = styled.span`
  color: #262626;
  font-size: 16px;
  
  @media (max-width: 768px) {
    color: #8e8e8e;
    font-size: 14px;
  }
`

export const FullName = styled.div`
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
  font-size: 16px;
`

export const Bio = styled.div`
  color: #262626;
  white-space: pre-line;
  line-height: 1.5;
  font-size: 16px;
`

export const TabsContainer = styled.div`
  display: flex;
  border-top: 1px solid #dbdbdb;
  margin-bottom: 28px;
`

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  border: none;
  background: transparent;
  color: ${(props) => (props.active ? "#262626" : "#8e8e8e")};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  border-top: ${(props) => (props.active ? "1px solid #262626" : "1px solid transparent")};
  margin-top: -1px;
  
  &:hover {
    color: #262626;
  }
`

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  
  @media (max-width: 768px) {
    gap: 3px;
  }
`

export const Post = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  margin: 0;
  
  &:hover {
    > div {
      opacity: 1;
    }
  }
`

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const PostOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`

export const PostStats = styled.div`
  display: flex;
  gap: 30px;
  color: white;
  font-weight: 600;
  
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: #8e8e8e;
  font-size: 16px;
`

export const NoPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`

export const NoPostsIcon = styled.div`
  font-size: 62px;
  margin-bottom: 16px;
  opacity: 0.3;
`

export const NoPostsText = styled.h2`
  font-size: 28px;
  font-weight: 300;
  color: #262626;
  margin: 0;
`
