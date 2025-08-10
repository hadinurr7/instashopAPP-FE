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

interface LoginPayload {
  identifier: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginPayload>({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const isDisabled = !form.identifier || !form.password;

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
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.identifier.includes("@") ? form.identifier : undefined,
          username: form.identifier.includes("@") ? undefined : form.identifier,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Login success!");
        setForm({ identifier: "", password: "" });
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      alert("An error occurred while logging in");
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
          name="identifier"
          placeholder="Email or Username"
          value={form.identifier}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        <LinkText>
          Don't have an account? <Link href="/register">Register</Link>
        </LinkText>
      </Form>
    </Container>
  );
}
