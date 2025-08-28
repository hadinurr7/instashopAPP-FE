import styled from "styled-components"

export const ExploreContainer = styled.div`
  max-width: 935px;
  margin: 0 auto;
  background: #ffffff;
  min-height: 100vh;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const SearchHeader = styled.header`
  position: sticky;
  top: 0;
  background: #ffffff;
  border-bottom: 1px solid #dbdbdb;
  z-index: 40;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

export const SearchContainer = styled.div`
  position: relative;
  max-width: 268px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8e8e8e;
  pointer-events: none;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  background: #efefef;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  font-size: 14px;
  color: #262626;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #8e8e8e;
  }

  &:focus {
    border-color: #0095f6;
    background: #ffffff;
  }
`

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  padding: 0;
  margin: 0;
`

export const ExploreItem = styled.div<{ $isLarge?: boolean; $isTall?: boolean }>`
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;
  overflow: hidden;
  
  ${(props) =>
    props.$isLarge &&
    `
    grid-column: span 2;
    grid-row: span 2;
  `}
  
  ${(props) =>
    props.$isTall &&
    !props.$isLarge &&
    `
    grid-row: span 2;
  `}

  &:hover img {
    transform: scale(1.05);
  }
`

export const ExploreImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`

export const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${ExploreItem}:hover & {
    opacity: 1;
  }
`

export const EngagementStats = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #ffffff;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;

  svg {
    width: 19px;
    height: 19px;
    fill: #ffffff;
  }
`

export const LoadingContainer = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: #8e8e8e;
  font-size: 14px;
`

export const ContentTypeIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #ffffff;
  z-index: 10;

  svg {
    width: 16px;
    height: 16px;
    fill: #ffffff;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
  }
`
