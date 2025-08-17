"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Container, Form, Title, Input, Button, LinkText } from "@/components/AuthForm.component"

interface LoginPayload {
  identifier: string
  password: string
}

export default function LoginPage() {
  const BASE_URL_BE = process.env.NEXT_PUBLIC_BASE_URL_BE

  const [form, setForm] = useState<LoginPayload>({
    identifier: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const isDisabled = !form.identifier.trim() || !form.password.trim()

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

    try {
      const payload = {
        email: form.identifier.includes("@") ? form.identifier : undefined,
        username: form.identifier.includes("@") ? undefined : form.identifier,
        password: form.password,
      }

      const response = await fetch(`${BASE_URL_BE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed!")
      }

      localStorage.setItem("token", data.data.token)
      router.replace("/profile")
    } catch (error: any) {
      alert(error.message || "An error occurred while logging in")
    } finally {
      setLoading(false)
    }
  }

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
        <LinkText style={{ marginTop: "8px" }}>
          <Link href="/forgot-password">Forgot password?</Link>
        </LinkText>
        <LinkText>
          Don't have an account? <Link href="/register">Register</Link>
        </LinkText>
      </Form>
    </Container>
  )
}
