"use client";


export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 select-none text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground font-mono text-center">
          © {new Date().getFullYear()} ChatFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
