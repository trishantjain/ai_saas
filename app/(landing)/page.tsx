import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Sign in button */}
      <Link href="/sign-in">
        <Button>
          Sign-in
        </Button>
      </Link>

      {/* Sign up button */}
      <Link href="/sign-up">
        <Button>
          Register
        </Button>
      </Link>
    </>
  );
}
