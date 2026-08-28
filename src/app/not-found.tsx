import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center text-[#B08747]">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p>Only /easytogo exist.</p>
      </div>
      <Link
        href="/easytogo"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "border border-[#8A6A38] text-[#B08747] hover:text-white",
          "bg-[linear-gradient(to_right,#8A6A38_50%,transparent_50%)] bg-size-[200%_100%] bg-right",
          "transition-[background-position,color] duration-500 ease-out hover:bg-left"
        )}
      >
        Back to Easy To Go
      </Link>
    </main>
  );
}
