export class UserServices {
  constructor(testRepository) {
    this.testRepository = testRepository;
  }

  async createTest(data) {
    if (!data.name) {
      throw new Error("Name is required");
    }
    if (!data.email) {
      throw new Error("Email is required");
    }

    return await this.testRepository.create(data);
  }
}
