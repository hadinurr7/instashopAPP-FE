"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import {
  Container,
  Form,
  Title,
  Input,
  Button,
  LinkText,
} from "@/components/styled.component";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const isDisabled = !form.username || !form.email || !form.password;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http:localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Register success!");
        setForm({ username: "", email: "", password: "" });
      } else {
        alert(data.message || "Register failed!");
      }
    } catch (error) {
      alert("An error occurred while registering");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>InstaShop</Title>
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? "Loading..." : "Daftar"}
        </Button>
        <LinkText>
          Have an account? <Link href="/login">Login</Link>
        </LinkText>
      </Form>
    </Container>
  );
}
