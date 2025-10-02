/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `initial` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `monthly` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `months` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Calculation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `initial_contribution` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_contribution` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_rate` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `months_to_reach_goal` to the `Calculation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "calculation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initial_contribution" REAL NOT NULL,
    "monthly_contribution" REAL NOT NULL,
    "monthly_rate" REAL NOT NULL,
    "months_to_reach_goal" INTEGER NOT NULL,
    CONSTRAINT "Calculation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("id") SELECT "id" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
