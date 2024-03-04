import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) => {
  if (totalPages === 1) return null;

  const viewablePages = 5;

  const maxPage = Math.min(
    totalPages,
    Math.max(currentPage + Math.floor(viewablePages / 2), viewablePages)
  );
  const minPage = Math.max(1, maxPage - viewablePages + 1);
  const pageList = Array.from(
    { length: maxPage - minPage + 1 },
    (_, i) => i + minPage
  );

  return (
    <div className="flex gap-4 text-lg">
      <Button
        className={cn(
          currentPage === 1 && "pointer-events-none opacity-20",
          "flex items-center gap-2"
        )}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <p className="text-white">Prev</p>
      </Button>

      <div className="flex items-center gap-3">
        {minPage > 1 && <p>...</p>}
        {pageList.map((p, index) => (
          <Button
            key={index}
            className={cn(p === currentPage && "bg-black/50 hover:bg-black/50")}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </Button>
        ))}
        {maxPage < totalPages && <p>...</p>}
      </div>
      <Button
        className={cn(
          currentPage === totalPages && "pointer-events-none opacity-20",
          "flex items-center gap-2"
        )}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <p className="text-white">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
