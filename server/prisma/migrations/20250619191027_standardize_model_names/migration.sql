/*
  Warnings:

  - You are about to drop the column `updateAt` on the `kudosCard` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `kudosCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "kudosCard" DROP CONSTRAINT "kudosCard_boardId_fkey";

-- AlterTable
ALTER TABLE "kudosCard" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Board";

-- CreateTable
CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "author" VARCHAR(50),
    "image" TEXT NOT NULL,
    "kudosCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kudosCard" ADD CONSTRAINT "kudosCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
