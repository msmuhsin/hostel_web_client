import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5 bg-slate-950">
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
