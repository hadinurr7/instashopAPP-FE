"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { Container, Form, Title, Input, Button, LinkText } from "@/components/AuthForm.component"

interface ForgotPasswordPayload {
  email: string
}

export default function ForgotPasswordPage() {
  const BASE_URL_BE = process.env.NEXT_PUBLIC_BASE_URL_BE

  const [form, setForm] = useState<ForgotPasswordPayload>({
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const isDisabled = !form.email.trim()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isDisabled) return
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${BASE_URL_BE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Password reset link has been sent to your email!")
        setForm({ email: "" })
      } else {
        throw new Error(data.message || "Failed to send reset email!")
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred while sending reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>InstaShop</Title>
        <p style={{ color: "#8e8e8e", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        {message && (
          <p
            style={{
              color: message.includes("sent") ? "#00a400" : "#ed4956",
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
  )
}
