import { ReactNode } from "react"
import AdminClientLayout from "./AdminClientLayout"

export const metadata = {
  title: "Admin Panel | GIGI STYLE",
  description: "Panel de administración para GIGI STYLE Lashes",
}

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>
}
