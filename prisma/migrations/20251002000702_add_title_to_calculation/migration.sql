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
    "title" TEXT NOT NULL DEFAULT 'Simulação sem nome',
    CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("createdAt", "id", "initialContribution", "monthlyContribution", "monthlyRate", "monthsToGoal", "userId") SELECT "createdAt", "id", "initialContribution", "monthlyContribution", "monthlyRate", "monthsToGoal", "userId" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
