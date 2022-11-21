import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Bus } from '../../entities/Bus';
import { Location } from '../../entities/Location';
import { Line, LineType } from '../../entities/Line';

define(Location, () => {
  const cairo = new Location();
  cairo.name = 'Cairo';
  cairo.description = faker.lorem.paragraph();
  return cairo;
});

define(Bus, () => {
  const bus = new Bus();
  bus.name = faker.word.adjective();
  bus.model = faker.vehicle.vehicle();
  bus.brand = faker.company.name();
  bus.plate_number = faker.color.rgb();
  return bus;
});

define(Line, () => {
  const line = new Line();
  line.origin_id = '-';
  line.destination_id = '-';
  line.bus_id = '-';
  line.price = 500;
  line.distance = 150;
  line.type = LineType.SHORT_TRIP;
  return line;
});
