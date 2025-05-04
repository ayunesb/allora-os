import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
export default function EmailConfirm() {
    return (<div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent you a confirmation email with a link to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-center text-muted-foreground">
            If you don't see the email in your inbox, please check your spam folder
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Resend email</Button>
        </CardFooter>
      </Card>
    </div>);
}
