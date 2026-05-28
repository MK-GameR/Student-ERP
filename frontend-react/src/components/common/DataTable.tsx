import React, { useState } from 'react';
import { Table } from './Table';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { usePagination } from '../../hooks/usePagination';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
}

export const DataTable = <T extends Record<string, any>>({ data, columns, searchKey }: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const headers = columns.map((col) => col.header);

  // Filter listings based on accessor lookup matrices
  const filteredData = data.filter((item) => {
    if (!searchKey || !searchQuery) return true;
    const targetVal = item[searchKey];
    return String(targetVal).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const { page, limit, nextPage, prevPage, setTargetPage } = usePagination({ initialLimit: 5 });
  
  const totalPages = Math.ceil(filteredData.length / limit);
  const offsetStart = (page - 1) * limit;
  const activePaginatedSlice = filteredData.slice(offsetStart, offsetStart + limit);

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex justify-between items-center">
          <SearchBar value={searchQuery} onChange={(val) => { setSearchQuery(val); setTargetPage(1, 1); }} />
        </div>
      )}

      <Table headers={headers}>
        {activePaginatedSlice.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500 font-medium">
              No contextual matches mapped in database registry lookup.
            </td>
          </tr>
        ) : (
          activePaginatedSlice.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                  {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onPageChange={setTargetPage}
      />
    </div>
  );
};