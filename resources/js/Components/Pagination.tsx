import React from "react";
import { Link } from "@inertiajs/react";

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    if (!links || links.length <= 3) return null; // Laravel always returns prev, next, so min 3

    return (
        <nav className="flex items-center gap-1">
            {links.map((link, idx) => (
                <Link
                    key={idx}
                    href={link.url ?? "#"}
                    className={`px-3 py-1 rounded ${
                        link.active
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    } ${!link.url ? "pointer-events-none opacity-50" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
};

export default Pagination;
