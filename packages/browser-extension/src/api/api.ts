const url = import.meta.env.VITE_API_URL
  || "http://localhost:5000";

async function login(email: string, password: string, rememberMe: boolean = false) {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe }),
  });
  console.log("login response:", res);

  if (!res.ok) throw new Error("שגיאה בהתחברות");
  return await res.json();
}
async function loginWithGoogle(credential: string) {
  const res = await fetch(`${url}/auth/google-auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // כדי לקבל עוגיות מהשרת
    body: JSON.stringify({
      payload: { credential }
    }),
  });
  console.log("loginWithGoogle response:", res);
  if (!res.ok) throw new Error("שגיאה בהתחברות עם Google");
  return await res.json();
}
async function refreshToken() {
  const res = await fetch(`${url}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  console.log("refreshToken response:", res);
  if (!res.ok) throw new Error("שגיאה בהתחברות עם Google");
  return await res.json();
}

async function getProgress(token: string, userId: string) {
  const res = await fetch(`${url}/questions/progress/${userId}`, {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
  });
  console.log("getProgress response:", res);
  if (!res.ok) throw new Error("שגיאה בשליפת התקדמות");
  return await res.json();
}
async function getTips(token: string) {
  const res = await fetch(`${url}/aiInsight`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("getTips response:", res);
  if (!res.ok) throw new Error("שגיאה בשליפת טיפים");
  return await res.json();
}

export { login, loginWithGoogle, refreshToken, getProgress, getTips };
