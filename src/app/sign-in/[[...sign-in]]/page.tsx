import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full flex justify-center mt-20">
      <SignIn />
    </main>
  );
}
