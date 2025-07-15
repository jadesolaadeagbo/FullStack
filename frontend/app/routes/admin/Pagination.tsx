import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
  itemName: string;
  fetchProducts: (newPage: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  total,
  itemsPerPage,
  itemName,
  fetchProducts,
}: PaginationProps) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      <p className="text-sm text-gray-600">
        Showing <strong>{itemsPerPage}</strong> of <strong>{total}</strong> {itemName}
      </p>

      <div className="flex items-center gap-2">
        <button
          className="bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          disabled={page <= 1}
          onClick={() => fetchProducts(page - 1)}
        >
          <ChevronLeft />
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          className=" bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          disabled={page >= totalPages}
          onClick={() => fetchProducts(page + 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
