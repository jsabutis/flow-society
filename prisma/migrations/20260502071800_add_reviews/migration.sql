-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "riderName" TEXT NOT NULL,
    "riderLocation" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "quote" TEXT NOT NULL,
    "photoUrl" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Review_tourId_idx" ON "Review"("tourId");
