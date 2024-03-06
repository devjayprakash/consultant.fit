/*
  Warnings:

  - Added the required column `end_date` to the `Sprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;
