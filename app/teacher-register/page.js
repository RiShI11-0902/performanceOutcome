"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Teacher"); // Default role is HOD
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log({ name, email, password, role, department });
    

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    const body = JSON.stringify(
      isLogin
        ? { email, password }
        : { name, email, password, role, department }
    );

    const res = await fetch(endpoint, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(data.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="bg-white/10 backdrop-blur-lg shadow-lg p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE3144] placeholder-white/50 transition"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE3144] transition"
              >
                <option className="text-black" value="Teacher">
                  Teacher
                </option>
              </select>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department"
                required
                className="w-full p-3 bg-transparent border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BE3144] placeholder-white/50 transition"
              />
            </>
          )}
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
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#BE3144] text-white font-semibold py-3 rounded-lg hover:bg-[#872341] transition"
          >
            {loading ? (
              <Loader className="animate-spin w-fit mx-auto" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
          <span className="text-white text-center">
            {isLogin ? "New User?" : "Already a User?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
