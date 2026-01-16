"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Search from "../ui/Search";
import React, { useState } from "react";
import SearchSpinner from "../ui/SearchSpinner";
import Closebutton from "../ui/Closebutton";


export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        const params = new URLSearchParams(searchParams.toString());

        if(searchTerm.trim()) {
            params.set("q", searchTerm.trim());
        } else {
            params.delete("q");
        }
        
        // Fixed: Added ? before params
        router.push(`/search?${params.toString()}`);

        setTimeout(() => setIsSearching(false), 500);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            handleSearch();
        }
    }

    const handleClear = () => {
        setSearchTerm("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");
        router.push(`/search?${params.toString()}`);
    }
    
    
    return(
        <div className="w-full max-w-4xl mx-auto px-4 mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 w-full mx-auto bg-cardback border border-cardborder rounded-full p-2 focus-within:border-foreground">
                <input 
                    type="text"
                    placeholder="Search for a service or business..."
                    className="w-full outline-none text-white bg-transparent placeholder-cardborder px-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="text-textgray hover:text-white transition-colors p-2"
                        aria-label="Clear search"
                    >
                        <Closebutton/>
                    </button>
                )}

                <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    aria-label="Search"
                    className="bg-foreground hover:bg-foreground/80 p-1 rounded-full transition-colors disabled:opacity-50"
                >
                    {isSearching ? (
                        <SearchSpinner/>
                    ) : (
                        <Search/>
                    )}
                </button>
            </div>
            
            {searchParams.get("q") && (
                <p className="text-textgray text-sm">
                    Showing results for: <span className="text-white font-medium">"{searchParams.get("q")}"</span>
                </p>
            )}
        </div>
    )
}