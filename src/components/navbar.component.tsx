"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Menu,
  Grid,
} from "lucide-react";

const SidebarWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;              /* full viewport height */
  width: 260px;               /* lebar sidebar */
  background-color: #fff;     /* putih */
  border-right: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* bagi atas dan bawah */
  padding: 20px 0;            /* jarak dalam */
  color: #000;
  z-index: 50;
  overflow-y: auto;           /* bisa scroll kalau menu panjang */

  @media (max-width: 1024px) {
    display: none;            /* hilang di tablet/HP */
  }
`;

const Logo = styled.div`
  padding: 24px;
  font-size: 24px;
  font-weight: bold;
  font-family: "Segoe UI", Helvetica, Arial, sans-serif;
  cursor: pointer;

  a {
    color: #000;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0 12px;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active }) => ($active ? "#000" : "#666")};
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #f2f2f2;
    color: #000;
  }

  svg {
    stroke: ${({ $active }) => ($active ? "#000" : "#666")};
    ${({ $active }) => $active && "fill: black;"}
  }
`;

const BottomMenu = styled.div`
  padding: 12px;
  border-top: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BottomButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;

  &:hover {
    background: #f2f2f2;
    color: #000;
  }

  svg {
    stroke: #666;
  }
`;

const DesktopSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/feeds", icon: Home, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/explore", icon: Compass, label: "Explore" },
    { href: "/reels", icon: Film, label: "Reels" },
    { href: "/messages", icon: MessageCircle, label: "Messages" },
    { href: "/notifications", icon: Heart, label: "Notifications" },
    { href: "/create", icon: PlusSquare, label: "Create" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <SidebarWrapper>
      <Logo>
        <Link href="/feeds">InstaShop</Link>
      </Logo>

      <Nav>
        {navItems.map(({ href, icon: Icon, label }) => (
          <NavItem key={href} href={href} $active={pathname === href}>
            <Icon size={24} />
            <span>{label}</span>
          </NavItem>
        ))}
      </Nav>

      <BottomMenu>
        <BottomButton>
          <Menu size={24} />
          <span>More</span>
        </BottomButton>
        <BottomButton>
          <Grid size={24} />
          <span>Also from Meta</span>
        </BottomButton>
      </BottomMenu>
    </SidebarWrapper>
  );
};

export default DesktopSidebar;
