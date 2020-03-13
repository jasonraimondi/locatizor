import { renamePhoto } from "@/renderer/rename";

it("something", () => {
  expect(renamePhoto("/tmp/foo.jpeg")).toBe("/tmp/foo.original.jpeg");
  expect(renamePhoto("/tmp/foo.jpg")).toBe("/tmp/foo.original.jpg");
});
