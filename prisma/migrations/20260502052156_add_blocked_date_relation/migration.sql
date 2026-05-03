-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlockedDate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT,
    "date" DATETIME NOT NULL,
    "reason" TEXT,
    CONSTRAINT "BlockedDate_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BlockedDate" ("date", "id", "reason", "tourId") SELECT "date", "id", "reason", "tourId" FROM "BlockedDate";
DROP TABLE "BlockedDate";
ALTER TABLE "new_BlockedDate" RENAME TO "BlockedDate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
