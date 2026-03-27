import { useState } from "react";

import { citizensData } from "@/lib/mock-data";
import type { Citizen } from "@/types/citizen";

export type CitizenFiltersType = {
  search: string;
  status: Citizen["status"] | undefined;
  gender: Citizen["gender"] | undefined;
  maritalStatus: Citizen["maritalStatus"] | undefined;
};

export type PaginationStateType = {
  page: number;
  pageSize: number;
};

const INITIAL_FILTERS: CitizenFiltersType = {
  search: "",
  status: undefined,
  gender: undefined,
  maritalStatus: undefined,
};

export const useCitizensTable = () => {
  const [filters, setFilters] = useState<CitizenFiltersType>(INITIAL_FILTERS);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    pageSize: 10,
  });

  const filteredData = citizensData.filter((citizen) => {
    const fullName = `${citizen.surname} ${citizen.name} ${citizen.patronymic}`.toLowerCase();

    return (
      (filters.search === "" || fullName.includes(filters.search.toLowerCase())) &&
      (!filters.status || citizen.status === filters.status) &&
      (!filters.gender || citizen.gender === filters.gender) &&
      (!filters.maritalStatus || citizen.maritalStatus === filters.maritalStatus)
    );
  });

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize,
  );

  const updateFilter = <K extends keyof CitizenFiltersType>(key: K, value: CitizenFiltersType[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    filters,
    pagination,
    total: filteredData.length,
    paginatedData,
    setPagination,
    updateFilter,
    resetFilters,
  };
};