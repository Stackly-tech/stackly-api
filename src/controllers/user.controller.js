export class UserController {
    constructor(testService) {
        this.testService = testService;
    }

    createTest = async (req, res) => {
        try {
            const result = await this.testService.createTest(req.body);

            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}