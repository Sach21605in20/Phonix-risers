// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-800 shadow-2xl"
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard/coordinator"
        />
      </div>
    </div>
  );
}