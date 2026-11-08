-- CreateTable
CREATE TABLE "Uporabnik" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "ime" TEXT,
    "priimek" TEXT,

    CONSTRAINT "Uporabnik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uporabnik_email_key" ON "Uporabnik"("email");
