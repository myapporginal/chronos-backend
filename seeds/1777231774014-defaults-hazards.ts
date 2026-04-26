import { Hazard } from '@modules/risk-management/hazards/hazard.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class DefaultsHazards1777231774014 implements Seeder {
  track = true;

  public async run(dataSource: DataSource): Promise<void> {
    const hazards: Partial<Hazard>[] = [
      {
        id: '1a1f1c01-1d1a-4a11-8a11-111111111111',
        hazardFamilyId: '18fb82ed-569f-4ed0-8bbb-1c84b6756ff3',
        name: 'Virus/bacterias',
        description: 'Virus y bacterias patógenas.',
        possibleEffects:
          'Infecciones respiratorias, gastrointestinales, fiebre, incapacidad temporal.',
      },
      {
        id: '1a1f1c02-1d1a-4a11-8a11-111111111112',
        hazardFamilyId: '18fb82ed-569f-4ed0-8bbb-1c84b6756ff3',
        name: 'Hongos',
        description: 'Hongos presentes en ambientes húmedos.',
        possibleEffects: 'Alergias, infecciones cutáneas o respiratorias.',
      },
      {
        id: '1a1f1c03-1d1a-4a11-8a11-111111111113',
        hazardFamilyId: '18fb82ed-569f-4ed0-8bbb-1c84b6756ff3',
        name: 'Fluidos corporales',
        description: 'Exposición a sangre y otros fluidos.',
        possibleEffects: 'Enfermedades infecciosas, contagio de patógenos.',
      },

      {
        id: '2b2f2c01-2d2a-4b22-8b22-222222222221',
        hazardFamilyId: '4b7b99ff-56ef-478c-8222-79b9837b9f75',
        name: 'Ruido',
        description: 'Exposición a niveles altos de sonido.',
        possibleEffects: 'Pérdida auditiva, estrés.',
      },
      {
        id: '2b2f2c02-2d2a-4b22-8b22-222222222222',
        hazardFamilyId: '4b7b99ff-56ef-478c-8222-79b9837b9f75',
        name: 'Temperaturas extremas',
        description: 'Exposición a calor o frío intenso.',
        possibleEffects: 'Golpe de calor, hipotermia, deshidratación.',
      },
      {
        id: '2b2f2c03-2d2a-4b22-8b22-222222222223',
        hazardFamilyId: '4b7b99ff-56ef-478c-8222-79b9837b9f75',
        name: 'Iluminación inadecuada',
        description: 'Niveles deficientes o excesivos de luz.',
        possibleEffects: 'Fatiga visual, errores, accidentes.',
      },

      {
        id: '3c3f3c01-3d3a-4c33-8c33-333333333331',
        hazardFamilyId: 'fecf2aea-6ee9-49f5-bdf2-06d7797b95ae',
        name: 'Polvos',
        description: 'Material particulado en el aire.',
        possibleEffects: 'Enfermedades respiratorias, irritación.',
      },
      {
        id: '3c3f3c02-3d3a-4c33-8c33-333333333332',
        hazardFamilyId: 'fecf2aea-6ee9-49f5-bdf2-06d7797b95ae',
        name: 'Gases/vapores',
        description: 'Sustancias químicas en estado gaseoso.',
        possibleEffects: 'Intoxicación, mareo, asfixia.',
      },
      {
        id: '3c3f3c03-3d3a-4c33-8c33-333333333333',
        hazardFamilyId: 'fecf2aea-6ee9-49f5-bdf2-06d7797b95ae',
        name: 'Sustancias corrosivas',
        description: 'Productos químicos que dañan tejidos.',
        possibleEffects: 'Quemaduras en piel y ojos.',
      },

      {
        id: '4d4f4c01-4d4a-4d44-8d44-444444444441',
        hazardFamilyId: '04af1e34-9772-4b11-9485-a857551266fd',
        name: 'Estrés laboral',
        description: 'Exceso de presión psicológica.',
        possibleEffects: 'Ansiedad, fatiga, bajo rendimiento.',
      },
      {
        id: '4d4f4c02-4d4a-4d44-8d44-444444444442',
        hazardFamilyId: '04af1e34-9772-4b11-9485-a857551266fd',
        name: 'Carga de trabajo',
        description: 'Exceso o falta de tareas.',
        possibleEffects: 'Agotamiento, errores.',
      },
      {
        id: '4d4f4c03-4d4a-4d44-8d44-444444444443',
        hazardFamilyId: '04af1e34-9772-4b11-9485-a857551266fd',
        name: 'Acoso laboral',
        description: 'Conductas hostiles en el trabajo.',
        possibleEffects: 'Depresión, ansiedad, ausentismo.',
      },

      {
        id: '5e5f5c01-5e5a-4e55-8e55-555555555551',
        hazardFamilyId: 'ce025b5c-1e34-4bee-9353-dda96305b3f5',
        name: 'Posturas forzadas',
        description: 'Posiciones inadecuadas del cuerpo.',
        possibleEffects: 'Dolor lumbar, lesiones musculares.',
      },
      {
        id: '5e5f5c02-5e5a-4e55-8e55-555555555552',
        hazardFamilyId: 'ce025b5c-1e34-4bee-9353-dda96305b3f5',
        name: 'Movimientos repetitivos',
        description: 'Repetición constante de movimientos.',
        possibleEffects: 'Tendinitis, síndrome del túnel carpiano.',
      },
      {
        id: '5e5f5c03-5e5a-4e55-8e55-555555555553',
        hazardFamilyId: 'ce025b5c-1e34-4bee-9353-dda96305b3f5',
        name: 'Manipulación de cargas',
        description: 'Levantamiento o transporte de peso.',
        possibleEffects: 'Lesiones de espalda, hernias.',
      },

      {
        id: '6f6f6c01-6f6a-4f66-8f66-666666666661',
        hazardFamilyId: '3459db9f-c845-4c23-9930-14765b109992',
        name: 'Riesgo mecánico',
        description: 'Contacto con máquinas o herramientas.',
        possibleEffects: 'Cortes, amputaciones, atrapamientos.',
      },
      {
        id: '6f6f6c02-6f6a-4f66-8f66-666666666662',
        hazardFamilyId: '3459db9f-c845-4c23-9930-14765b109992',
        name: 'Riesgo eléctrico',
        description: 'Contacto con energía eléctrica.',
        possibleEffects: 'Electrocución, quemaduras.',
      },
      {
        id: '6f6f6c03-6f6a-4f66-8f66-666666666663',
        hazardFamilyId: '3459db9f-c845-4c23-9930-14765b109992',
        name: 'Caídas',
        description: 'Superficies inseguras o alturas.',
        possibleEffects: 'Fracturas, contusiones, muerte.',
      },

      {
        id: '7a7f7c01-7a7a-4a77-8a77-777777777771',
        hazardFamilyId: '26ef738e-09db-43f1-9402-b096e6ccc372',
        name: 'Sismos',
        description: 'Movimientos sísmicos.',
        possibleEffects: 'Traumatismos, colapso de estructuras.',
      },
      {
        id: '7a7f7c02-7a7a-4a77-8a77-777777777772',
        hazardFamilyId: '26ef738e-09db-43f1-9402-b096e6ccc372',
        name: 'Inundaciones',
        description: 'Acumulación de agua.',
        possibleEffects: 'Ahogamiento, enfermedades.',
      },
      {
        id: '7a7f7c03-7a7a-4a77-8a77-777777777773',
        hazardFamilyId: '26ef738e-09db-43f1-9402-b096e6ccc372',
        name: 'Deslizamientos',
        description: 'Movimiento de tierra.',
        possibleEffects: 'Atrapamiento, lesiones graves.',
      },
    ];

    for (const hazard of hazards) {
      const repository = dataSource.getRepository(Hazard);
      const existing = await repository.findOne({
        where: { id: hazard.id },
      });
      if (!existing) {
        await repository.save(hazard);
      }
    }
  }
}
