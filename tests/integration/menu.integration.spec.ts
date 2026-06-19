import request from "supertest";

import app from "../../src/app";

describe("POST /api/v1/menu", () => {
  it("should create menu", async () => {
    const response = await request(app).post("/api/v1/menus").send({
      name: "Informática",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Informática");
  });
});

it("should not create duplicate menu", async () => {
  await request(app).post("/api/v1/menus").send({
    name: "Informática",
  });

  const response = await request(app).post("/api/v1/menus").send({
    name: "Informática",
  });

  expect(response.status).toBe(409);
  expect(response.body.message).toBe("Menu already exists");
});

it("should retrieve menu tree", async () => {
  await request(app).post("/api/v1/menus").send({
    name: "Informática",
  });

  const response = await request(app).get("/api/v1/menus");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].name).toBe("Informática");
});

it("should build menu tree", async () => {
  const parent = await request(app).post("/api/v1/menus").send({
    name: "Informática",
  });

  await request(app).post("/api/v1/menus").send({
    name: "Apple",
    relatedId: parent.body.id,
  });

  const response = await request(app).get("/api/v1/menus");

  expect(response.body).toEqual([
    {
      id: parent.body.id,
      name: "Informática",
      submenus: [
        {
          id: expect.any(String),
          name: "Apple",
          submenus: [],
        },
      ],
    },
  ]);
});
