/*
  Warnings:

  - You are about to drop the `Repos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Repos" DROP CONSTRAINT "Repos_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_access_token" TEXT;

-- DropTable
DROP TABLE "Repos";
