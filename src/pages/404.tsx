export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg">
        Page not found. Try the sidebar or return{' '}
        <a href="/" className="underline">
          home
        </a>.
      </p>
    </div>
  );
}
