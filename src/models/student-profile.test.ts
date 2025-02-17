import { describe, it, expect, vi } from "vitest";
import { getStudentData } from "../models/student-profile";

describe("getStudentData", () => {
    it("hämtar studentdata baserat på ID", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ id: "123", name: "Test Student", email: "test@example.com" })
            })
        ) as jest.Mock;

        const student = await getStudentData("123");
        expect(student).toEqual({ id: "123", name: "Test Student", email: "test@example.com" });
    });

    it("returnerar null om ingen student hittas", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(null)
            })
        ) as jest.Mock;

        const student = await getStudentData("999");
        expect(student).toBeNull();
    });
});