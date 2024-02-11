"use client";
import SearchWindow from "@/components/Search";
import SongsList from "@/components/Songs/SongsList";
import Providers from "@/store/provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 gap-5">
      <Providers>
        <SearchWindow />
        <SongsList />
      </Providers>
    </main>
  );
}
