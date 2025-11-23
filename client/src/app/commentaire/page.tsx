import CommentaireContent from "./CommentaireContent";

export default function CommentairePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const menuId = searchParams?.menu_id;
  const menuTitle = searchParams?.menu_title;

  return (
    <CommentaireContent
      menuId={menuId as string | undefined}
      menuTitle={menuTitle as string | undefined}
    />
  );
}
