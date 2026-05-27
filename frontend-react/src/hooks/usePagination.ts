import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
}

export const usePagination = ({ initialPage = 1, initialLimit = 10 }: UsePaginationProps = {}) => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const nextPage = useCallback((totalPages: number) => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const setTargetPage = useCallback((targetPage: number, totalPages: number) => {
    if (targetPage >= 1 && targetPage <= totalPages) {
      setPage(targetPage);
    }
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Force reset pointer mapping to frame one to safeguard against data fragmentation indices
  }, []);

  return {
    page,
    limit,
    nextPage,
    prevPage,
    setTargetPage,
    changeLimit,
  };
};