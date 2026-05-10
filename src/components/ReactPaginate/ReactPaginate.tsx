import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./ReactPaginate.module.css";

// Оголошуємо додатковий тип, який описує те, що ми імпортували.
// Це об’єкт форми { default: компонент }.
type ModuleWithDefault<T> = { default: T };

// У змінну отримуємо значення з властивості default.
// За допомогою as додаємо всю оригінальну типізацію ReactPaginateProps.
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

// Описуємо пропси
interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (nextPage: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
