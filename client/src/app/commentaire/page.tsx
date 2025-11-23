import CommentaireContent from "./CommentaireContent";

type PageProps = {
  searchParams?: {
    menu_id?: string;
    menu_title?: string;
  };
};

export default function CommentairePage({ searchParams }: PageProps) {
  const menuId = searchParams?.menu_id || undefined;
  const menuTitle = searchParams?.menu_title || undefined;

  return (
    <CommentaireContent
      menuId={menuId}
      menuTitle={menuTitle}
    />
  );
}
