"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SpinnerWhite from "../ui/SpinnerWhite";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface LogoUploadProps {
    companyId: string;
    currentImageUrl?: string | null;
}

export default function LogoUpload({ companyId, currentImageUrl }: LogoUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        const allowedTypes = ["image/webp", "image/jpeg", "image/png", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            setError("Only WEBP, JPEG, PNG, and SVG images are allowed");
            return;
        }

        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError("File size must be less than 5MB");
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("companyId", companyId);

            const response = await fetch("/api/company/upload-logo", {
                method: "POST",
                // DON'T set Content-Type header - browser sets it automatically with boundary
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload logo");
            }

            const data = await response.json();
            setPreviewUrl(data.imageUrl);
            
            // Refresh the page to show updated logo everywhere
            router.refresh();

        } catch (err: any) {
            setError(err.message || "Failed to upload logo");
            setPreviewUrl(currentImageUrl || null); // Revert to original
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveLogo = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            {/* Preview Area */}
            <div className="mb-4">
                {previewUrl ? (
                    <div className="relative w-40 h-40 mx-auto">
                        <img
                            src={previewUrl}
                            alt="Company logo"
                            className="w-full h-full object-cover rounded-lg border-2 border-inputcolor"
                        />
                        {!loading && (
                            <button
                                onClick={handleRemoveLogo}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                title="Remove logo"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        {loading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <SpinnerWhite />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-40 h-40 mx-auto border-2 border-dashed border-inputcolor rounded-lg flex items-center justify-center bg-clientcard">
                        <ImageIcon className="w-12 h-12 text-textgray" />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            {/* Upload Button */}
            <div className="flex justify-center">
                <button
                    onClick={triggerFileInput}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <SpinnerWhite />
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload className="w-5 h-5" />
                            <span>{previewUrl ? "Change Logo" : "Upload Logo"}</span>
                        </>
                    )}
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/webp,image/jpeg,image/png,image/svg+xml"
                onChange={handleFileSelect}
                disabled={loading}
                className="hidden"
            />

            {/* Info Text */}
            <p className="text-center text-textgray text-xs mt-3">
                WEBP, JPEG, PNG, or SVG • Max 5MB
            </p>
        </div>
    );
}