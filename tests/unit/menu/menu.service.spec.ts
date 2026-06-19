import { IMenuRepository } from "../../../src/modules/menu/interfaces/menu.interface";
import { MenuService } from "../../../src/modules/menu/services/menu.service";
import { AppError } from "../../../src/modules/menu/shared/errors/app-error";

describe("MenuService", () => {
  let service: MenuService;
  let repositoryMock: jest.Mocked<IMenuRepository>;

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      findChildren: jest.fn(),
      deleteById: jest.fn(),
    };

    service = new MenuService(repositoryMock);
  });

  it("should create a menu", async () => {
    repositoryMock.findByName.mockResolvedValue(null);

    repositoryMock.create.mockResolvedValue({
      _id: "123",
      name: "Informática",
      relatedId: null,
    } as any);

    const response = await service.create({
      name: "Informática",
    });

    expect(response.id).toBe("123");
  });

  it("should build menu tree", async () => {
    repositoryMock.findAll.mockResolvedValue([
      {
        _id: "1",
        name: "Informática",
        relatedId: null,
      },
      {
        _id: "2",
        name: "Computadores",
        relatedId: "1",
      },
    ] as any);

    const response = await service.getMenuTree();

    expect(response).toEqual([
      {
        id: "1",
        name: "Informática",
        submenus: [
          {
            id: "2",
            name: "Computadores",
            submenus: [],
          },
        ],
      },
    ]);
  });

  it("should delete menu", async () => {
    repositoryMock.findChildren.mockResolvedValue([]);

    await service.delete("1");

    expect(repositoryMock.deleteById).toHaveBeenCalledWith("1");
  });

  it("should throw when menu already exists", async () => {
    repositoryMock.findByName.mockResolvedValue({
      _id: "1",
    } as any);

    await expect(
      service.create({
        name: "Informática",
      }),
    ).rejects.toThrow(AppError);
  });

  it("should throw when parent menu does not exist", async () => {
    repositoryMock.findByName.mockResolvedValue(null);

    repositoryMock.findById.mockResolvedValue(null);

    await expect(
      service.create({
        name: "LCD",
        relatedId: "999",
      }),
    ).rejects.toThrow(AppError);
  });
});
