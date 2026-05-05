import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DemoDock from "@/app/components/ui/DemoDock";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ id: "1" }),
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("DemoDock", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it("kullanıcı listesi başlangıçta kapalı olmalı", () => {
    render(<DemoDock />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("kullanıcı ikonuna tıklayınca liste açılmalı", async () => {
    render(<DemoDock />);
    const button = screen.getByLabelText("Kullanıcı Değiştir");
    fireEvent.click(button);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("tema butonuna tıklayınca dark class eklenmeli", () => {
    render(<DemoDock />);
    const button = screen.getByLabelText("Temayı Değiştir");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("tekrar tıklayınca dark class kaldırılmalı", () => {
    document.documentElement.classList.add("dark");
    render(<DemoDock />);
    const button = screen.getByLabelText("Temayı Değiştir");
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
