"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin, type AdminLoginState } from "./actions";

const initialState: AdminLoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-graphite-700 bg-navy-900 p-8"
      >
        <h1 className="mb-1 text-lg font-semibold text-offwhite-50">Admin Access</h1>
        <p className="mb-6 text-sm text-slate-400">
          Enter the admin password to view consultation requests.
        </p>

        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Password
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoFocus
            className="h-11 w-full rounded-xl border border-graphite-700 bg-white px-4 pr-11 text-sm text-offwhite-50 focus:outline-none focus-visible:border-electric-500 focus-visible:ring-2 focus-visible:ring-electric-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-offwhite-50"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {state.status === "error" && (
          <p role="alert" className="mb-4 text-xs text-danger-700">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-700 to-purple-500 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
