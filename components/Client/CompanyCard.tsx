import { CompanySearchCardProps } from "@/constants/Interfaces";
import Link from "next/link";
import Stars from "../ui/Star";
import ArrowBlack from "../ui/ArrowBlack";
import Image from "next/image";
import { Star } from "lucide-react";



export function CompanyCard({ id, name, slug, serviceType, rating, imageUrl } : CompanySearchCardProps) {

    return(
        <Link
            href={`/search/${slug}`}
            className="block w-full rounded-xl bg-slate-800/50 p-3 transition-all hover:bg-slate-800/70"
        >
            <div className="relative mb-3 aspect-[16/10] max-h-48 w-full overflow-hidden rounded-xl sm:max-h-none">
                {imageUrl ? (
                    <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <p className="text-sm text-slate-400">No image provided.</p>
                    </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-slate-900/90 px-2 py-1 text-xs font-medium text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-sm">
                    {serviceType}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-lg font-semibold text-white">{name}</h3>
                <div className="flex shrink-0 items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-semibold text-white">{rating.toFixed(1)}</span>
                    <span className="text-slate-400">({rating.toFixed(1)})</span>
                </div>
                </div>

                {/* Address row */}
                <p className="text-sm leading-relaxed text-slate-400">Budapest, 1121 Őzike út 28A</p>
            </div>
        </Link>
    )

}