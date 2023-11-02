const Loading = () => {
  return <span className="loading loading-spinner text-accent"></span>
}
export default Loading
// and that's why we commented out the "Suspense" component in RootLayout

// Keeping loading.tsx (file convention) in our codebase, by default, enables Loading-spinner on all children components
