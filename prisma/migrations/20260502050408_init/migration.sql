-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Mexico',
    "bikeTypes" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "basePriceUsd" INTEGER NOT NULL,
    "heroImage" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "included" TEXT NOT NULL,
    "notIncluded" TEXT NOT NULL,
    "maxGroup" INTEGER NOT NULL DEFAULT 8,
    "driveTimeMin" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TourDeparture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TourDeparture_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlockedDate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT,
    "date" DATETIME NOT NULL,
    "reason" TEXT
);

-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "travelMm" INTEGER NOT NULL,
    "wheelSize" TEXT NOT NULL,
    "drivetrain" TEXT NOT NULL,
    "brakes" TEXT NOT NULL,
    "suspension" TEXT NOT NULL,
    "tires" TEXT NOT NULL,
    "sizesAvail" TEXT NOT NULL,
    "riderHeightCm" TEXT NOT NULL,
    "dailyRateUsd" INTEGER NOT NULL,
    "heroImage" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "departureId" TEXT NOT NULL,
    "leadName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "partySize" INTEGER NOT NULL,
    "riders" TEXT NOT NULL,
    "pickup" TEXT NOT NULL,
    "dietary" TEXT,
    "spanishHelp" BOOLEAN NOT NULL DEFAULT false,
    "emergencyName" TEXT NOT NULL,
    "emergencyPhone" TEXT NOT NULL,
    "hearAbout" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BookingRequest_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookingRequest_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "TourDeparture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tour_slug_key" ON "Tour"("slug");

-- CreateIndex
CREATE INDEX "TourDeparture_tourId_startDate_idx" ON "TourDeparture"("tourId", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "Bike_slug_key" ON "Bike"("slug");

-- CreateIndex
CREATE INDEX "BookingRequest_departureId_status_idx" ON "BookingRequest"("departureId", "status");
