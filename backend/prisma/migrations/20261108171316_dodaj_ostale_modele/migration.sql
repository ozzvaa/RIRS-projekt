-- CreateEnum
CREATE TYPE "Spol" AS ENUM ('m', 'z');

-- CreateTable
CREATE TABLE "Avtor" (
    "id" SERIAL NOT NULL,
    "priimek" TEXT,
    "ime" TEXT,
    "spol" "Spol" DEFAULT 'm',
    "opis" TEXT,

    CONSTRAINT "Avtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knjiga" (
    "id" SERIAL NOT NULL,
    "naslov" TEXT,
    "podnaslov" TEXT,
    "sifra" INTEGER,
    "leto_izdaje" INTEGER,
    "prva_izdaja" BOOLEAN,
    "navedba_izdaje" TEXT,
    "izvirno" BOOLEAN,
    "prevod_iz" TEXT,
    "izvirni_naslov" TEXT,
    "stevilo_znakov_s_presledki" INTEGER,
    "avtorske_pole" DECIMAL(10,2),
    "st_osnovnih_strani" INTEGER,
    "st_dodatnih_strani" INTEGER,
    "st_strani_skupaj" INTEGER,
    "naklada" INTEGER,
    "format_Id" INTEGER,
    "vezava_Id" INTEGER,
    "notranji_papir_Id" INTEGER,
    "ovitek_papir_Id" INTEGER,
    "vezni_listi_papir_Id" INTEGER,
    "tisk_notranje_strani" TEXT,
    "tisk_ovitek" TEXT,
    "tisk_vezani_listi" TEXT,
    "nadizvod" DECIMAL(10,2),
    "kapitalni_trak" BOOLEAN,
    "kapitalni_trak_tip" TEXT,
    "oznacevalna_vrvica" BOOLEAN,
    "oznacevalna_vrvica_tip" TEXT,
    "dodelava" TEXT,
    "cobiss_Id" TEXT,
    "zaloznik_Id" INTEGER,
    "opombe_pogodbena_dolocila" TEXT,
    "rok_izdaje_po_pogodbi" TIMESTAMP(3),
    "rubrika_katalog_Id" INTEGER,
    "jak" BOOLEAN,
    "subvencije" TEXT,
    "znesek_subvencije" DECIMAL(10,2),
    "datum_izdaje" TIMESTAMP(3),
    "prvi_prodajni_dan" TIMESTAMP(3),
    "cena_mpc" DECIMAL(10,2),
    "ddv_Id" INTEGER,
    "vsebina_za_katalog" TEXT,
    "daljsi_sestavek_o_knjigi" TEXT,
    "kratek_citat" TEXT,

    CONSTRAINT "knjiga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spremno_besedilo" (
    "id" SERIAL NOT NULL,
    "vloga" TEXT NOT NULL,
    "avtor_Id" INTEGER NOT NULL,
    "knjiga_Id" INTEGER NOT NULL,

    CONSTRAINT "spremno_besedilo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "papir" (
    "id" SERIAL NOT NULL,
    "ime" TEXT,
    "volumen" TEXT,
    "gramatura" TEXT,

    CONSTRAINT "papir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "povprasevanje_naklada" (
    "id" SERIAL NOT NULL,
    "naklada" INTEGER NOT NULL,
    "cena" DECIMAL(10,2) NOT NULL,
    "knjiga_Id" INTEGER NOT NULL,

    CONSTRAINT "povprasevanje_naklada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isbn" (
    "id" SERIAL NOT NULL,
    "isbn" TEXT NOT NULL,
    "zaloznik_Id" INTEGER NOT NULL,
    "knjiga_Id" INTEGER NOT NULL,

    CONSTRAINT "isbn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zalozba" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "zalozba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rubrika" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "rubrika_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nagrada" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "nagrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zbirka" (
    "id" SERIAL NOT NULL,
    "ime" TEXT NOT NULL,

    CONSTRAINT "zbirka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "format" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vezava" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,

    CONSTRAINT "vezava_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ddv" (
    "id" SERIAL NOT NULL,
    "stopnja" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "ddv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Avtorji" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Avtorji_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Prevajalci" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Prevajalci_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Lektorji" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Lektorji_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Uredniki" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Uredniki_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_KorekturnoBranje" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KorekturnoBranje_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Prelom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Prelom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Oblikovanje" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Oblikovanje_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Ilustratorji" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Ilustratorji_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_IzvirnaZalozba" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IzvirnaZalozba_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Sozalozniki" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Sozalozniki_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SodelujoceZalozbe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SodelujoceZalozbe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RubrikeNaSpletu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RubrikeNaSpletu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_KnjigaNagrada" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KnjigaNagrada_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_KnjigeVZbirki" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_KnjigeVZbirki_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "knjiga_sifra_key" ON "knjiga"("sifra");

-- CreateIndex
CREATE UNIQUE INDEX "format_naziv_key" ON "format"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "vezava_naziv_key" ON "vezava"("naziv");

-- CreateIndex
CREATE UNIQUE INDEX "ddv_stopnja_key" ON "ddv"("stopnja");

-- CreateIndex
CREATE INDEX "_Avtorji_B_index" ON "_Avtorji"("B");

-- CreateIndex
CREATE INDEX "_Prevajalci_B_index" ON "_Prevajalci"("B");

-- CreateIndex
CREATE INDEX "_Lektorji_B_index" ON "_Lektorji"("B");

-- CreateIndex
CREATE INDEX "_Uredniki_B_index" ON "_Uredniki"("B");

-- CreateIndex
CREATE INDEX "_KorekturnoBranje_B_index" ON "_KorekturnoBranje"("B");

-- CreateIndex
CREATE INDEX "_Prelom_B_index" ON "_Prelom"("B");

-- CreateIndex
CREATE INDEX "_Oblikovanje_B_index" ON "_Oblikovanje"("B");

-- CreateIndex
CREATE INDEX "_Ilustratorji_B_index" ON "_Ilustratorji"("B");

-- CreateIndex
CREATE INDEX "_IzvirnaZalozba_B_index" ON "_IzvirnaZalozba"("B");

-- CreateIndex
CREATE INDEX "_Sozalozniki_B_index" ON "_Sozalozniki"("B");

-- CreateIndex
CREATE INDEX "_SodelujoceZalozbe_B_index" ON "_SodelujoceZalozbe"("B");

-- CreateIndex
CREATE INDEX "_RubrikeNaSpletu_B_index" ON "_RubrikeNaSpletu"("B");

-- CreateIndex
CREATE INDEX "_KnjigaNagrada_B_index" ON "_KnjigaNagrada"("B");

-- CreateIndex
CREATE INDEX "_KnjigeVZbirki_B_index" ON "_KnjigeVZbirki"("B");

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_format_Id_fkey" FOREIGN KEY ("format_Id") REFERENCES "format"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_vezava_Id_fkey" FOREIGN KEY ("vezava_Id") REFERENCES "vezava"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_notranji_papir_Id_fkey" FOREIGN KEY ("notranji_papir_Id") REFERENCES "papir"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_ovitek_papir_Id_fkey" FOREIGN KEY ("ovitek_papir_Id") REFERENCES "papir"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_vezni_listi_papir_Id_fkey" FOREIGN KEY ("vezni_listi_papir_Id") REFERENCES "papir"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_zaloznik_Id_fkey" FOREIGN KEY ("zaloznik_Id") REFERENCES "zalozba"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_rubrika_katalog_Id_fkey" FOREIGN KEY ("rubrika_katalog_Id") REFERENCES "rubrika"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knjiga" ADD CONSTRAINT "knjiga_ddv_Id_fkey" FOREIGN KEY ("ddv_Id") REFERENCES "ddv"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spremno_besedilo" ADD CONSTRAINT "spremno_besedilo_avtor_Id_fkey" FOREIGN KEY ("avtor_Id") REFERENCES "Avtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spremno_besedilo" ADD CONSTRAINT "spremno_besedilo_knjiga_Id_fkey" FOREIGN KEY ("knjiga_Id") REFERENCES "knjiga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "povprasevanje_naklada" ADD CONSTRAINT "povprasevanje_naklada_knjiga_Id_fkey" FOREIGN KEY ("knjiga_Id") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isbn" ADD CONSTRAINT "isbn_zaloznik_Id_fkey" FOREIGN KEY ("zaloznik_Id") REFERENCES "zalozba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isbn" ADD CONSTRAINT "isbn_knjiga_Id_fkey" FOREIGN KEY ("knjiga_Id") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Avtorji" ADD CONSTRAINT "_Avtorji_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Avtorji" ADD CONSTRAINT "_Avtorji_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Prevajalci" ADD CONSTRAINT "_Prevajalci_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Prevajalci" ADD CONSTRAINT "_Prevajalci_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Lektorji" ADD CONSTRAINT "_Lektorji_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Lektorji" ADD CONSTRAINT "_Lektorji_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Uredniki" ADD CONSTRAINT "_Uredniki_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Uredniki" ADD CONSTRAINT "_Uredniki_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KorekturnoBranje" ADD CONSTRAINT "_KorekturnoBranje_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KorekturnoBranje" ADD CONSTRAINT "_KorekturnoBranje_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Prelom" ADD CONSTRAINT "_Prelom_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Prelom" ADD CONSTRAINT "_Prelom_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Oblikovanje" ADD CONSTRAINT "_Oblikovanje_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Oblikovanje" ADD CONSTRAINT "_Oblikovanje_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Ilustratorji" ADD CONSTRAINT "_Ilustratorji_A_fkey" FOREIGN KEY ("A") REFERENCES "Avtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Ilustratorji" ADD CONSTRAINT "_Ilustratorji_B_fkey" FOREIGN KEY ("B") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IzvirnaZalozba" ADD CONSTRAINT "_IzvirnaZalozba_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IzvirnaZalozba" ADD CONSTRAINT "_IzvirnaZalozba_B_fkey" FOREIGN KEY ("B") REFERENCES "zalozba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Sozalozniki" ADD CONSTRAINT "_Sozalozniki_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Sozalozniki" ADD CONSTRAINT "_Sozalozniki_B_fkey" FOREIGN KEY ("B") REFERENCES "zalozba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SodelujoceZalozbe" ADD CONSTRAINT "_SodelujoceZalozbe_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SodelujoceZalozbe" ADD CONSTRAINT "_SodelujoceZalozbe_B_fkey" FOREIGN KEY ("B") REFERENCES "zalozba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RubrikeNaSpletu" ADD CONSTRAINT "_RubrikeNaSpletu_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RubrikeNaSpletu" ADD CONSTRAINT "_RubrikeNaSpletu_B_fkey" FOREIGN KEY ("B") REFERENCES "rubrika"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnjigaNagrada" ADD CONSTRAINT "_KnjigaNagrada_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnjigaNagrada" ADD CONSTRAINT "_KnjigaNagrada_B_fkey" FOREIGN KEY ("B") REFERENCES "nagrada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnjigeVZbirki" ADD CONSTRAINT "_KnjigeVZbirki_A_fkey" FOREIGN KEY ("A") REFERENCES "knjiga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnjigeVZbirki" ADD CONSTRAINT "_KnjigeVZbirki_B_fkey" FOREIGN KEY ("B") REFERENCES "zbirka"("id") ON DELETE CASCADE ON UPDATE CASCADE;
