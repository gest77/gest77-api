import * as yup from "yup";
import * as express from "express";
import { badRequest } from "./ErrorService";

export const SortOrder = ["ASC", "asc", "DESC", "desc"];
export type SortOrder = typeof SortOrder[number];

export type OrderByInput<T> = Array<{ key: keyof T; order: SortOrder }>;

export const SortOrderSchema = yup.mixed<SortOrder>().oneOf(Object.values(SortOrder));

const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_ELEMENTS_PER_PAGE = Infinity;

export interface PaginationInput {
    pageIndex: number;
    elementsPerPage: number;
}

// TODO : add constraints on F and O
export interface SearchInput<F, O> {
    filters?: F;
    pagination?: PaginationInput;
    orderby?: OrderByInput<O>;
}

export const defaultPaginationInput: PaginationInput = { pageIndex: DEFAULT_PAGE_INDEX, elementsPerPage: DEFAULT_ELEMENTS_PER_PAGE };

export const PaginationInputSchema = yup
    .object({
        pageIndex: yup.number().required("validation.required"),
        elementsPerPage: yup.number().required("validation.required").min(1),
    })
    .noUnknown(true);

export const preparePaginationFilters = (input?: PaginationInput): { skip?: number; take?: number } => {
    if (!input) return { skip: undefined, take: undefined };

    if (!input.elementsPerPage) input.elementsPerPage = DEFAULT_ELEMENTS_PER_PAGE;
    if (!input.pageIndex) input.pageIndex = DEFAULT_PAGE_INDEX;

    const take = input.elementsPerPage;
    const skip = input.pageIndex * take;

    return { skip, take };
};

export interface PaginatedResponse<T> {
    pageIndex: number;
    totalPage: number;
    elementsPerPage: number;
    totalElements: number;
    elements: Array<T>;
}

export const buildPaginateResponse = <T>(elements: Array<T>, totalElements: number, input?: PaginationInput): PaginatedResponse<T> => {
    if (!input) input = defaultPaginationInput;
    if (!input.elementsPerPage) input.elementsPerPage = DEFAULT_ELEMENTS_PER_PAGE;
    if (!input.pageIndex) input.pageIndex = DEFAULT_PAGE_INDEX;

    // unwaited cases : number of page of zero, or infitnity => considered as one page.
    let totalPage = 1;
    if (input.elementsPerPage !== 0 && input.elementsPerPage !== Infinity) totalPage = Math.ceil(totalElements / input.elementsPerPage);

    // if input.elementsPerPage is infinity, then number of element on first page is ALL.
    let elementsPerPage = input.elementsPerPage;
    if (input.elementsPerPage == Infinity) elementsPerPage = totalElements;

    return {
        pageIndex: input.pageIndex,
        totalPage,
        elementsPerPage,
        totalElements,
        elements,
    };
};

export const parseFiltersInQuery = (req: express.Request): { filters?: string; pagination?: string; orderby?: Array<string> } => {
    let filters;
    let pagination;
    let orderby;

    try {
        filters = req.query.filters ? JSON.parse(req.query.filters as string) : undefined;
    } catch (e) {
        throw badRequest("validation.invalid", null, { invalid: "filters" });
    }
    try {
        pagination = req.query.pagination ? JSON.parse(req.query.pagination as string) : undefined;
    } catch (e) {
        throw badRequest("validation.invalid", null, { invalid: "pagination" });
    }
    try {
        const orderByInQuery = req.query.orderby ? JSON.parse(req.query.orderby as string) : undefined;
        // we transform orderby in query into an array to comply with Prisma orderBy handling. See https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sorting
        if (orderByInQuery) {
            if (Array.isArray(orderByInQuery)) {
                orderby = orderByInQuery;
            } else {
                orderby = [orderByInQuery];
            }
        }
    } catch (e) {
        throw badRequest("validation.invalid", null, { invalid: "orderby" });
    }
    return { filters, pagination, orderby };
};
