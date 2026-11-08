-- CreateTable
CREATE TABLE "_UrednikiNaProjektu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UrednikiNaProjektu_AB_pkey" PRIMARY KEY ("A", "B")
);

-- CreateIndex
CREATE INDEX "_UrednikiNaProjektu_B_index" ON "_UrednikiNaProjektu"("B");

-- AddForeignKey
ALTER TABLE "_UrednikiNaProjektu" ADD CONSTRAINT "_UrednikiNaProjektu_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UrednikiNaProjektu" ADD CONSTRAINT "_UrednikiNaProjektu_B_fkey" FOREIGN KEY ("B") REFERENCES "Uporabnik"("id") ON DELETE CASCADE ON UPDATE CASCADE;
