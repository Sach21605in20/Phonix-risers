// app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-800 shadow-2xl"
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard/coordinator"
        />
      </div>
    </div>
  );
}