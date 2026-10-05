"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { StatsErrorState } from "@/components/stats/stats-feedback";

type Props = {
  children: ReactNode;
  sectionTitle?: string;
};

type State = {
  error: Error | null;
};

export class SectionErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[SectionErrorBoundary${this.props.sectionTitle ? `: ${this.props.sectionTitle}` : ""}]`, error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <StatsErrorState
          message={
            this.props.sectionTitle
              ? `${this.props.sectionTitle} failed to render.`
              : "This section failed to render."
          }
          onRetry={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}
