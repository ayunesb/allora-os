import React, { useState } from "react";
import { useAuthCompat } from "@/hooks/useAuthCompat";
import { useNavigate } from "react-router-dom";
// Simplified placeholder component for demo purposes
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, isLoading } = useAuthCompat();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signIn)
            return;
        const result = await signIn(email, password);
        if (result.success) {
            navigate("/dashboard");
        }
    };
    const handleLogin = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login error:', error.message);
        }
        else {
            console.log('Login successful:', data);
        }
    };
    return (<div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border py-1.5 px-3"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              Password
            </label>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border py-1.5 px-3"/>
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500">
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
