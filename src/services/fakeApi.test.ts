import { describe, it, expect } from "vitest";
import { fakeApi } from "./fakeApi";

describe("fakeApi", () => {
  it("should return animals matching search term", async () => {
    const results = await fakeApi.searchAnimals("dog");

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(
        (animal) =>
          animal.title.toLowerCase().includes("dog") ||
          animal.type.toLowerCase().includes("dog")
      )
    ).toBe(true);
  });

  it("should return empty array for non-matching term", async () => {
    const results = await fakeApi.searchAnimals("xyzabc123notfound");
    expect(results).toEqual([]);
  });

  it("should return empty array for empty search term", async () => {
    const results = await fakeApi.searchAnimals("");
    expect(results).toEqual([]);
  });
});
