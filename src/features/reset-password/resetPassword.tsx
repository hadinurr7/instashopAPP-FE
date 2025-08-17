"use client";

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Form,
  Title,
  Input,
  Button,
  LinkText,
} from "@/components/AuthForm.component";

interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const BASE_URL_BE = process.env.NEXT_PUBLIC_BASE_URL_BE;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState<ResetPasswordPayload>({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing reset token");
    }
  }, [token]);

  const isDisabled =
    !form.password.trim() ||
    !form.confirmPassword.trim() ||
    form.password !== form.confirmPassword;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isDisabled || !token) return;

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL_BE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(data.message || "Failed to reset password!");
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container>
        <Form>
          <Title>InstaShop</Title>
          <p
            style={{
              color: "#ed4956",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Invalid or missing reset token. Please request a new password reset.
          </p>
          <LinkText>
            <Link href="/forgot-password">Request Password Reset</Link>
          </LinkText>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>InstaShop</Title>
        <p
          style={{
            color: "#8e8e8e",
            fontSize: "14px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Enter your new password below.
        </p>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
        {message && (
          <p
            style={{
              color: message.includes("successfully") ? "#00a400" : "#ed4956",
              fontSize: "14px",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
        <LinkText>
          Remember your password? <Link href="/login">Back to Login</Link>
        </LinkText>
      </Form>
    </Container>
  );
}
