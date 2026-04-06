import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We have sent you a confirmation link. Please check your email to verify your account.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
