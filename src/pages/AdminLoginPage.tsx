import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = (location.state as { from?: string } | null)?.from || "/admin";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) {
      setError("Invalid username or password");
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <SiteLayout>
      <Section className="bg-muted/20">
        <Container size="narrow">
          <form onSubmit={onSubmit} className="rounded-xl border border-border bg-background p-6 md:p-8 space-y-5">
            <Heading level={2}>Admin Login</Heading>
            <p className="text-sm text-muted-foreground">
              Sign in to upload and manage service content.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit">Login</Button>
          </form>
        </Container>
      </Section>
    </SiteLayout>
  );
}

