"use client"

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.href = "/login"
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium rounded-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition"
    >
      <i className="fa-solid fa-right-from-bracket mr-2"></i> Sair
    </button>
  )
}
