import React from "react";
import { useEffect } from "react";

type HeadProps = {
  title?: string;
  children?: React.ReactNode;
};

export function HeadTitle({ title, children }: HeadProps) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    if (!children) return;

    const elements: HTMLElement[] = [];

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      const el = document.createElement(child.type as string);

      Object.entries(child.props as Record<string, unknown>).forEach(([key, value]) => {
        el.setAttribute(key, String(value));
      });

      document.head.appendChild(el);
      elements.push(el);
    });

    return () => {
      elements.forEach((el) => document.head.removeChild(el));
    };
  }, [children]);

  return null;
}