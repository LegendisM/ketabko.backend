import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694107087608 implements MigrationInterface {
    name = 'Migration1694107087608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_driver_enum" AS ENUM('zarinpal', 'nextpay')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'processing', 'fail', 'complete')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driver" "public"."payment_driver_enum" NOT NULL, "authority" character varying NOT NULL, "tracking" character varying NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid, "userId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'complete')`);
        await queryRunner.query(`CREATE TYPE "public"."order_entitytype_enum" AS ENUM('book')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_enum" NOT NULL DEFAULT 'pending', "entityType" "public"."order_entitytype_enum" NOT NULL, "entityId" uuid NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."comment_entitytype_enum" AS ENUM('book')`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "message" character varying NOT NULL, "entityType" "public"."comment_entitytype_enum" NOT NULL, "entityId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."storage_file_type_enum" AS ENUM('avatar', 'photo', 'custom')`);
        await queryRunner.query(`CREATE TYPE "public"."storage_file_driver_enum" AS ENUM('local', 's3')`);
        await queryRunner.query(`CREATE TABLE "storage_file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "detail" character varying NOT NULL, "type" "public"."storage_file_type_enum" NOT NULL DEFAULT 'custom', "mime" character varying NOT NULL, "size" integer NOT NULL, "path" character varying NOT NULL, "driver" "public"."storage_file_driver_enum" NOT NULL DEFAULT 'local', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b227a0824aac2dd9136c5052d8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "avatarId" uuid, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "coverId" uuid, "audioId" uuid, "authorId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "fields" text NOT NULL DEFAULT '[]', "bookId" uuid, CONSTRAINT "PK_6edda19654147368603ac44072e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_section_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "values" text NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "sectionId" uuid, "userId" uuid, CONSTRAINT "PK_12b715b12d9f9aaced157f6631e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "phone" character varying, "email" character varying, "password" character varying NOT NULL, "level" integer NOT NULL DEFAULT '0', "roles" text NOT NULL DEFAULT '["user"]', "avatarId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_categories_category" ("bookId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_baff6a8cd85658522dd9568a6ba" PRIMARY KEY ("bookId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f2c919594cd1b6386240d6d46" ON "book_categories_category" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83b564c6e2518a2af3c60ac9da" ON "book_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "storage_file" ADD CONSTRAINT "FK_e427e912a64ecb39b1d34383bf0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "author" ADD CONSTRAINT "FK_951793c2d205920890b20fdea09" FOREIGN KEY ("avatarId") REFERENCES "storage_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_ea921939b25c4a315e461fc886e" FOREIGN KEY ("coverId") REFERENCES "storage_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_7eb94f2a913cfd7c7a89ed73872" FOREIGN KEY ("audioId") REFERENCES "storage_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_section" ADD CONSTRAINT "FK_f80d28aaadd6eee2a8d023ad5cd" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_section_document" ADD CONSTRAINT "FK_b844e8d502e1abf35e1f0d0653f" FOREIGN KEY ("sectionId") REFERENCES "book_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_section_document" ADD CONSTRAINT "FK_b3dd9b4a87451331caf251c0f87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "storage_file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_3f2c919594cd1b6386240d6d464" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6"`);
        await queryRunner.query(`ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_3f2c919594cd1b6386240d6d464"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "book_section_document" DROP CONSTRAINT "FK_b3dd9b4a87451331caf251c0f87"`);
        await queryRunner.query(`ALTER TABLE "book_section_document" DROP CONSTRAINT "FK_b844e8d502e1abf35e1f0d0653f"`);
        await queryRunner.query(`ALTER TABLE "book_section" DROP CONSTRAINT "FK_f80d28aaadd6eee2a8d023ad5cd"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_7eb94f2a913cfd7c7a89ed73872"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_ea921939b25c4a315e461fc886e"`);
        await queryRunner.query(`ALTER TABLE "author" DROP CONSTRAINT "FK_951793c2d205920890b20fdea09"`);
        await queryRunner.query(`ALTER TABLE "storage_file" DROP CONSTRAINT "FK_e427e912a64ecb39b1d34383bf0"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_d09d285fe1645cd2f0db811e293"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83b564c6e2518a2af3c60ac9da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f2c919594cd1b6386240d6d46"`);
        await queryRunner.query(`DROP TABLE "book_categories_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "book_section_document"`);
        await queryRunner.query(`DROP TABLE "book_section"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "storage_file"`);
        await queryRunner.query(`DROP TYPE "public"."storage_file_driver_enum"`);
        await queryRunner.query(`DROP TYPE "public"."storage_file_type_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TYPE "public"."comment_entitytype_enum"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_entitytype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_driver_enum"`);
    }

}
