import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// component that throws when rendered
function Bomb(): React.ReactNode {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("renders children when there's no error", () => {
    render(
      <ErrorBoundary>
        <div>all good</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("all good")).toBeInTheDocument();
  });

  it("shows the default fallback when a child throws", () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("uses a custom fallback if provided", () => {
    const fallback = <div data-testid="fallback">custom error</div>;
    render(
      <ErrorBoundary fallback={fallback}>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("fallback")).toBeInTheDocument();
  });
});
