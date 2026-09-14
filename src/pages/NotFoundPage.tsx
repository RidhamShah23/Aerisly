import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Weather not found here
        </h2>

        <p className="mt-2 text-sm opacity-70">
          The page you're looking for doesn't exist.
        </p>
       <button
  onClick={() => navigate("/")}
  className="mt-6 rounded-xl border px-5 py-3 font-medium transition-opacity hover:opacity-70"
>
  Back to Dashboard
</button>
      </div>
    </div>
  );
}