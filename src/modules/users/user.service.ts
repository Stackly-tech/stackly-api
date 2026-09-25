import { UserRepository } from "./user.repository.js";
type QueryType = "list" | "page" | "dropdown" | "single";
export class UserService {
  constructor(private repo: UserRepository) {}
  // user.service.t
  getItems = async (params: {
    type: QueryType;
    filters?: unknown;
    sortBy?: any;
    include?: any;
    page: number;
    pageSize: number;
    select: [];
    id?: string;
  }) => {
    switch (params.type) {
      case "single":
      // return this.repo.findOne(params.id!);

      case "dropdown":
      // return this.repo.findForDropdown(params.filters);

      case "list":
        return await this.getItemsList(params);

      default:
        return await this.getItemsList(params);
    }
  };
  getItemsList = async (params: {
    type: QueryType;
    filters?: unknown;
    sortBy?: any;
    include?: any;
    page: number;
    pageSize: number;
    select: [];
    id?: string;
  }) => {
    return await this.repo.findPage(params.filters, params.select, {
      sortBy: params.sortBy,
      include: params.include,
      page: params.page,
      pageSize: params.pageSize,
    });
  };

  createItem = async () => {};
}
