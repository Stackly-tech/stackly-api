import { faker } from "@faker-js/faker";
import { prisma } from "../src/common/config/prisma";
async function main() {
  console.log("Cleaning up existing data...");
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.employee.deleteMany();

  console.log("Seeding courses...");
  const courses = [];
  for (let i = 0; i < 10; i++) {
    const course = await prisma.course.create({
      data: {
        // Generating realistic-sounding tech/business course names
        title: `${faker.hacker.verb()} ${faker.hacker.noun()} for ${faker.person.jobArea()}`,
        description: faker.lorem.paragraph(),
        duration: faker.number.int({ min: 2, max: 40 }), // 2 to 40 hours
        skillLevel: faker.helpers.arrayElement([
          "Beginner",
          "Intermediate",
          "Advanced",
        ]),
      },
    });
    courses.push(course);
  }

  console.log("Seeding employees and their enrollments...");
  for (let i = 0; i < 50; i++) {
    const employee = await prisma.employee.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        department: faker.commerce.department(),
        jobTitle: faker.person.jobTitle(),
      },
    });

    // Assign 1 to 3 random courses to each employee
    const enrollmentsCount = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < enrollmentsCount; j++) {
      const randomCourse = faker.helpers.arrayElement(courses);
      const status = faker.helpers.arrayElement([
        "ENROLLED",
        "IN_PROGRESS",
        "COMPLETED",
      ]);

      // Calculate logical progress based on status
      let progress = 0;
      if (status === "COMPLETED") progress = 100;
      if (status === "IN_PROGRESS")
        progress = faker.number.int({ min: 10, max: 90 });

      await prisma.enrollment.create({
        data: {
          employeeId: employee.id,
          courseId: randomCourse.id,
          status: status,
          progress: progress,
        },
      });
    }
  }

  console.log("Database seeded successfully! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
