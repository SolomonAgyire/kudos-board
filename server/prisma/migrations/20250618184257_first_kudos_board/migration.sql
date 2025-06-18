-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "catergory" VARCHAR(50) NOT NULL,
    "author" VARCHAR(50),
    "image" TEXT NOT NULL,
    "kudosCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kudosCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "description" TEXT NOT NULL,
    "author" VARCHAR(50),
    "image" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "kudosCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kudosCard" ADD CONSTRAINT "kudosCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
