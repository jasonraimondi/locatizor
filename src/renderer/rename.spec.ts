import { renamePhoto } from "@/renderer/rename";

describe("Rename", () => {
  it("add default suffix", () => {
    expect(renamePhoto("/tmp/foo.jpeg")).toBe("/tmp/foo.original.jpeg");
    expect(renamePhoto("/tmp/foo.jpg")).toBe("/tmp/foo.original.jpg");
  });

  it("add alternate suffix", () => {
    expect(renamePhoto("/tmp/foo.jpg", "-bkp")).toBe("/tmp/foo-bkp.jpg");
  });

  it("add prefix", () => {
    expect(renamePhoto("/tmp/foo.jpg", "", "new-")).toBe("/tmp/new-foo.jpg");
  });

  it("add prefix and suffix", () => {
    expect(renamePhoto("/tmp/foo.jpg", "-changed", "new-")).toBe("/tmp/new-foo-changed.jpg");
  });
});
