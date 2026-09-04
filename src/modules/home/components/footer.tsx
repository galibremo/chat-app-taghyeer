export default function Footer() {
  return (
    <footer className="relative z-10 bg-card border-t border-border py-6 select-none text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">
        <div className="text-xs text-muted-foreground font-mono flex items-center gap-[5.5px]">
          © {new Date().getFullYear()} All rights reserved by <span className="glitch-logo" data-text="REMO.">REMO.</span>
        </div>
      </div>
    </footer>
  );
}
