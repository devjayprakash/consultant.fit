-- CreateTable
CREATE TABLE "Repos" (
    "repo_link" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Repos_pkey" PRIMARY KEY ("repo_link","user_id")
);

-- AddForeignKey
ALTER TABLE "Repos" ADD CONSTRAINT "Repos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
