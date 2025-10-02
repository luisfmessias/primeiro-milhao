/*
  Warnings:

  - You are about to drop the column `calculation_date` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `initial_contribution` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_contribution` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_rate` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `months_to_reach_goal` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `initialContribution` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyContribution` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRate` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthsToGoal` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initialContribution" REAL NOT NULL,
    "monthlyContribution" REAL NOT NULL,
    "monthlyRate" REAL NOT NULL,
    "monthsToGoal" INTEGER NOT NULL,
    CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("id") SELECT "id" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
