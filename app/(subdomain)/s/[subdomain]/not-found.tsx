export default function NotFound() {
  const rootUrl =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN === "localhost:3000"
      ? "http://localhost:3000"
      : `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-6">
      <p className="text-xs uppercase tracking-widest text-stone-400 font-sans">
        404
      </p>
      <h1 className="text-4xl text-stone-700 font-serif italic">
        This Space Has Not Been Created Yet
      </h1>
      <p className="text-stone-400 font-serif text-sm max-w-sm">
        The diary you are looking for does not exist.
      </p>
      <a
        href={rootUrl}
        className="mt-4 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 transition-colors font-sans"
      >
        ← Go home
      </a>
    </div>
  );
}
