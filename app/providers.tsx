'use client'

// NovaOps doesn't need Web3 providers — this is a DevOps dashboard.
// Cleaned up leftover wagmi/rainbowkit imports that broke the build.

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
