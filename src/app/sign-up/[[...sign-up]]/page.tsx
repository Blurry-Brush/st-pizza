import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-full flex justify-center mt-10">
      <SignUp />
    </main>
  );
}
