import { ClerkProvider } from "@clerk/nextjs";
import AccountNavbar from "../components/layout/AccountNavbar";
import { Toaster } from "react-hot-toast";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <section>
        <Toaster />
        <AccountNavbar />
        {children}
      </section>
    </ClerkProvider>
  );
}
