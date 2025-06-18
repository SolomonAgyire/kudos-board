/*
  Warnings:

  - You are about to drop the column `catergory` on the `Board` table. All the data in the column will be lost.
  - Added the required column `category` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "catergory",
ADD COLUMN     "category" VARCHAR(50) NOT NULL;
