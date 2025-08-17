import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`

export const Form = styled.form`
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 40px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
`

export const Title = styled.h1`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #262626;
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 24px;
`

export const Input = styled.input`
  color: #333;
  width: 100%;
  margin: 6px 0;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 14px;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #a8a8a8;
  }
`

export const Button = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background-color: #0095f6;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #b2dffc;
    cursor: not-allowed;
  }
`

export const LinkText = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #333;
  text-align: center;

  a {
    color: #3897f0;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`
