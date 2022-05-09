-- CreateTable
CREATE TABLE "Fire" (
    "id" TEXT NOT NULL,
    "discoveryTime" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "x" DECIMAL(65,30) NOT NULL,
    "y" DECIMAL(65,30) NOT NULL,
    "wkid" INTEGER NOT NULL,

    CONSTRAINT "Fire_pkey" PRIMARY KEY ("id")
);
