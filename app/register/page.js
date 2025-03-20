"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState()
  const [isLogin, setisLogin] = useState()
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(data.error);
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#09122C] via-[#BE3144] to-[#872341] p-5">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE3144] placeholder-white/50 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE3144] placeholder-white/50 transition"
          />
          {error && <p className="text-red-200 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#BE3144] text-white font-semibold py-3 rounded-lg hover:bg-[#872341] transition"
          >
            {loading ? <Loader className="animate-spin w-fit mx-auto" /> : (isLogin ? "Login" : "Register" )}
          </button>
          <span className="text-white">{isLogin ? "New User?" : "Already a User?"} <button onClick={()=> setisLogin(!isLogin)}>{isLogin ? "Register": " Login" }</button></span>
        </form>
      </div>
    </div>
  );
}
