"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import type { ComponentProps } from "react";

type AccountLinkProps = Omit<ComponentProps<typeof Link>, "href" | "prefetch"> & {
  href?: string;
};

export function AccountLink({ children, href = "/account", ...props }: AccountLinkProps) {
  const { status } = useSession();

  return (
    <Link href={href} prefetch={status === "authenticated"} {...props}>
      {children}
    </Link>
  );
}
