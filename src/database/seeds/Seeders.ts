import { Seeder, Factory } from 'typeorm-seeding';
import { Location } from '../../entities/Location';
import { Bus } from '../../entities/Bus';
import { Line, LineType } from '../../entities/Line';
import { AppDataSource } from '../../utility/data-source';
// import { Order } from '../../entities/Order';

export default class Seeders implements Seeder {
  public async run(factory: Factory): Promise<any> {
    /** Clear database  */
    await AppDataSource.initialize();

    // const orderRepo = AppDataSource.getRepository(Order);
    // await orderRepo.delete({});

    const lineRepo = AppDataSource.getRepository(Line);
    await lineRepo.delete({});

    const busRepo = AppDataSource.getRepository(Bus);
    await busRepo.delete({});

    const locationRepo = AppDataSource.getRepository(Location);
    await locationRepo.delete({});

    // Locations
    const [alex, aswan, cairo] = await Promise.all([
      await factory(Location)().create({ name: 'Alexandria' }),
      await factory(Location)().create({ name: 'Aswan' }),
      await factory(Location)().create({ name: 'Cairo' }),
    ]);

    // Buses
    const [busOne, busTwo] = await Promise.all([
      await factory(Bus)().create(),
      await factory(Bus)().create(),
    ]);

    // Lines
    await factory(Line)().create({
      origin_id: cairo.id,
      destination_id: alex.id,
      bus_id: busOne.id,
      distance: 90,
      type: LineType.SHORT_TRIP,
      price: 50,
    });

    await factory(Line)().create({
      origin_id: cairo.id,
      destination_id: aswan.id,
      bus_id: busTwo.id,
      distance: 150,
      type: LineType.LONG_TRIP,
      price: 90,
    });
  }
}
