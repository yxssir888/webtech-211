"use client";

import CommentaireContent from "./CommentaireContent";

export default function CommentairePage({
  searchParams,
}: any) {
  const menuId = searchParams?.menu_id;
  const menuTitle = searchParams?.menu_title;

  return (
    <CommentaireContent
      menuId={menuId}
      menuTitle={menuTitle}
    />
  );
}
