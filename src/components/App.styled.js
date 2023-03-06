import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid black;

  > nav {
    display: flex;
  }
`;

export const Logo = styled.p`
  font-weight: 700;
  margin: 0;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const BackBtn = styled(NavLink)`
  width: 84px;
  height: 36px;
  background-color: #008000;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: $FFF;
  font-weight: 500;
  display: block;
  margin-bottom: 40px;

  &:visited {
    color: #fff
  }

  // &.active {
  //   color: white;
  //   background-color: orangered;
  // }

  

`;

export const OutletLink = styled(NavLink)`
  height: 36px;
  background-color: #ffffff;
  padding: 8px 16px;
  border: 1px solid #264d32;
  border-radius: 4px;
  text-decoration: none;
  color: #264d32;
  font-weight: 400;
  font-size: 14px;
  display: block;



  &.active {
  color: white;
  background-color: #264d32;
  }  
  `
