import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function ProfileDiagnostics() {
  const auth = useAuth();
  const { user, session, isLoading, hasInitialized } = auth;
  if (isLoading || !hasInitialized) {
    return null;
  }
  if (!user) {
    return (
      <Card className="mb-6 bg-red-50 dark:bg-red-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-600 dark:text-red-400">
            Not Authenticated
          </CardTitle>
          <CardDescription>
            You are not currently authenticated. Please sign in to view your
            profile.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="mb-6 bg-green-50 dark:bg-green-900/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-600 dark:text-green-400">
          Authentication Status
        </CardTitle>
        <CardDescription>You are authenticated as {user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-1.5">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Session Active:</strong> {session ? "Yes" : "No"}
          </p>
          {session && (
            <div className="mt-2">
              <p>
                <strong>Session Details:</strong>
              </p>
              <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(
                  {
                    provider: session?.provider_token
                      ? "OAuth provider"
                      : "Email/Password",
                    expires_at: session?.expires_at
                      ? new Date(session.expires_at * 1000).toLocaleString()
                      : "Unknown",
                    last_accessed: session?.last_sign_in_at
                      ? new Date(session.last_sign_in_at).toLocaleString()
                      : "Unknown",
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
