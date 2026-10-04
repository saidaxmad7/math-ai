import { BookmarksList } from "@/features/bookmarks/components/bookmark-list";

export default function BookmarksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookmarks</h1>

        <p className="text-muted-foreground">
          Saqlangan darslaringiz.
        </p>
      </div>

      <BookmarksList />
    </div>
  );
}