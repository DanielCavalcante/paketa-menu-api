import { IMenuRepository } from "../../src/modules/menu/interfaces/menu.interface";

export const repositoryMock: jest.Mocked<IMenuRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  findAll: jest.fn(),
  findChildren: jest.fn(),
  deleteById: jest.fn(),
};
