import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1777234865568 implements MigrationInterface {
    name = 'InitialMigration1777234865568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hazard_families" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, "description" text, CONSTRAINT "PK_9620582111d0139a8800e2eaf22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hazards" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "hazard_family_id" uuid NOT NULL, "company_id" uuid, "name" character varying(255) NOT NULL, "description" text, "possible_effects" text, CONSTRAINT "PK_237b20b02a3823b79d5a0144c7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_id" uuid, "name" character varying(255) NOT NULL, "description" text, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, "enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_298f2c0e2ea45289aa0c4ac8a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_id" uuid, "name" character varying(255) NOT NULL, "description" text, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_areas" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "work_center_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "description" text, CONSTRAINT "PK_50b32ea86ee7096cc58345f887e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_centers" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "address" character varying(300), "city" character varying(100), "department" character varying(100), "employee_count" integer NOT NULL DEFAULT '0', "is_main" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_efd461c689b6b2894c3ab1c930a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "positions" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "work_center_id" uuid NOT NULL, "name" character varying(200) NOT NULL, "description" text, "risk_level" smallint, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employees_document_type_enum" AS ENUM('CC', 'CE', 'PA', 'TI', 'RC', 'NU')`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "work_center_id" uuid NOT NULL, "position_id" uuid, "user_id" uuid, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "document_type" "public"."employees_document_type_enum" NOT NULL, "document_number" character varying(20) NOT NULL, "entry_date" date NOT NULL, "exit_date" date, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "REL_2d83c53c3e553a48dadb9722e3" UNIQUE ("user_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_id" uuid, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "role_id" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "last_login_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "nit" character varying NOT NULL, "name" character varying NOT NULL, "economic_activity" character varying(10) NOT NULL, "risk_class" smallint NOT NULL, "employee_count" integer NOT NULL DEFAULT '0', "city" character varying(100) NOT NULL, "department" character varying(100) NOT NULL, "arl_name" character varying(100), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ed61d4dcafb6fe0f595f5e0cbd0" UNIQUE ("nit"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."risk_assessments_intervention_level_enum" AS ENUM('I', 'II', 'III', 'IV')`);
        await queryRunner.query(`CREATE TYPE "public"."risk_assessments_acceptability_enum" AS ENUM('not_acceptable', 'not_acceptable_with_controls', 'acceptable_with_specific_control', 'acceptable')`);
        await queryRunner.query(`CREATE TYPE "public"."risk_assessments_status_enum" AS ENUM('identified', 'in_treatment', 'controlled', 'residual')`);
        await queryRunner.query(`CREATE TABLE "risk_assessments" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "company_id" uuid NOT NULL, "work_center_id" uuid NOT NULL, "work_area_id" character varying NOT NULL, "position_id" uuid NOT NULL, "hazard_id" character varying NOT NULL, "responsible_id" character varying NOT NULL, "process_name" character varying(200) NOT NULL, "activity" character varying(300) NOT NULL, "is_routine" boolean NOT NULL DEFAULT true, "workers_exposed" integer NOT NULL, "existing_controls" text, "nd" smallint NOT NULL, "ne" smallint NOT NULL, "np" smallint NOT NULL, "nc" smallint NOT NULL, "nr" integer NOT NULL, "intervention_level" "public"."risk_assessments_intervention_level_enum" NOT NULL, "acceptability" "public"."risk_assessments_acceptability_enum" NOT NULL, "status" "public"."risk_assessments_status_enum" NOT NULL DEFAULT 'identified', "last_review_date" date, "next_review_date" date, CONSTRAINT "PK_2717ff3f294d30390a712653d63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."control_measures_hierarchy_level_enum" AS ENUM('elimination', 'substitution', 'engineering', 'administrative', 'ppe')`);
        await queryRunner.query(`CREATE TYPE "public"."control_measures_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'delayed')`);
        await queryRunner.query(`CREATE TABLE "control_measures" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "risk_assessment_id" character varying NOT NULL, "company_id" character varying NOT NULL, "responsible_id" character varying NOT NULL, "hierarchy_level" "public"."control_measures_hierarchy_level_enum" NOT NULL, "description" text NOT NULL, "due_date" date NOT NULL, "completion_date" date, "status" "public"."control_measures_status_enum" NOT NULL DEFAULT 'pending', "effectiveness_rating" smallint, CONSTRAINT "PK_ed89a8d8a573fe865c73c531927" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hazards" ADD CONSTRAINT "FK_9055635acc12d647c32308fdcc4" FOREIGN KEY ("hazard_family_id") REFERENCES "hazard_families"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_4bc1204a05dde26383e3955b0a1" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work_areas" ADD CONSTRAINT "FK_ca35a20300f87cf9ecb71adbe24" FOREIGN KEY ("work_center_id") REFERENCES "work_centers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_centers" ADD CONSTRAINT "FK_5b5596e4575fd263f6ab047d34f" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "positions" ADD CONSTRAINT "FK_27dd11335bd3f64ea16fbb0e19c" FOREIGN KEY ("work_center_id") REFERENCES "work_centers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_d135f48cbe14991707646a4c5d0" FOREIGN KEY ("work_center_id") REFERENCES "work_centers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "risk_assessments" ADD CONSTRAINT "FK_5c8aeed5a1cc7e6bf254664a585" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "risk_assessments" ADD CONSTRAINT "FK_a62451ec17d39b8abd100aad23b" FOREIGN KEY ("work_center_id") REFERENCES "work_centers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "risk_assessments" ADD CONSTRAINT "FK_1072a85f2c8cadd0506f13bdd1d" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "risk_assessments" DROP CONSTRAINT "FK_1072a85f2c8cadd0506f13bdd1d"`);
        await queryRunner.query(`ALTER TABLE "risk_assessments" DROP CONSTRAINT "FK_a62451ec17d39b8abd100aad23b"`);
        await queryRunner.query(`ALTER TABLE "risk_assessments" DROP CONSTRAINT "FK_5c8aeed5a1cc7e6bf254664a585"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_d135f48cbe14991707646a4c5d0"`);
        await queryRunner.query(`ALTER TABLE "positions" DROP CONSTRAINT "FK_27dd11335bd3f64ea16fbb0e19c"`);
        await queryRunner.query(`ALTER TABLE "work_centers" DROP CONSTRAINT "FK_5b5596e4575fd263f6ab047d34f"`);
        await queryRunner.query(`ALTER TABLE "work_areas" DROP CONSTRAINT "FK_ca35a20300f87cf9ecb71adbe24"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_4bc1204a05dde26383e3955b0a1"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`ALTER TABLE "hazards" DROP CONSTRAINT "FK_9055635acc12d647c32308fdcc4"`);
        await queryRunner.query(`DROP TABLE "control_measures"`);
        await queryRunner.query(`DROP TYPE "public"."control_measures_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."control_measures_hierarchy_level_enum"`);
        await queryRunner.query(`DROP TABLE "risk_assessments"`);
        await queryRunner.query(`DROP TYPE "public"."risk_assessments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."risk_assessments_acceptability_enum"`);
        await queryRunner.query(`DROP TYPE "public"."risk_assessments_intervention_level_enum"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TYPE "public"."employees_document_type_enum"`);
        await queryRunner.query(`DROP TABLE "positions"`);
        await queryRunner.query(`DROP TABLE "work_centers"`);
        await queryRunner.query(`DROP TABLE "work_areas"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "hazards"`);
        await queryRunner.query(`DROP TABLE "hazard_families"`);
    }

}
