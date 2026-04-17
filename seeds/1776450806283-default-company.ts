import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Company } from '@modules/organization-structure/companies/companies.entity';

export class DefaultCompany1776450806283 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const company = new Company();
    company.id = '570d759b-6b5f-46a7-a2ba-0699172b4782';
    company.nit = '90123456789';
    company.name = 'Default Company';
    company.economicActivity = '1234567890';
    company.riskClass = 1;
    company.employeeCount = 1;
    company.city = 'Default City';
    company.department = 'Default Department';
    company.arlName = 'Default Arl';
    company.isActive = true;

    const repository = dataSource.getRepository(Company);

    // Avoid duplicate entry
    const existing = await repository.findOne({ where: { nit: company.nit } });
    if (!existing) {
      await repository.save(company);
    }
  }
}
