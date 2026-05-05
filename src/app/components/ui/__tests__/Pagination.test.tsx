import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "@/app/components/ui/Pagination";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Pagination", () => {
  it("totalPages 1 ve limit 5 ise render edilmemeli", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} limit={5} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("limit seçenekleri render edilmeli", () => {
    render(<Pagination currentPage={1} totalPages={3} limit={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("ilk sayfada Önceki butonu disabled olmalı", () => {
    render(<Pagination currentPage={1} totalPages={3} limit={5} />);
    expect(screen.getByText("← Önceki")).toBeDisabled();
  });

  it("son sayfada Sonraki butonu disabled olmalı", () => {
    render(<Pagination currentPage={3} totalPages={3} limit={5} />);
    expect(screen.getByText("Sonraki →")).toBeDisabled();
  });

  it("Sonraki butonuna tıklayınca page 2'ye gitmeli", () => {
    render(<Pagination currentPage={1} totalPages={3} limit={5} />);
    fireEvent.click(screen.getByText("Sonraki →"));
    expect(mockPush).toHaveBeenCalledWith("?page=2");
  });

  it("limit değiştirince page 1'e dönmeli", () => {
    render(<Pagination currentPage={2} totalPages={3} limit={5} />);
    fireEvent.click(screen.getByText("10"));
    expect(mockPush).toHaveBeenCalledWith("?limit=10&page=1");
  });
});
