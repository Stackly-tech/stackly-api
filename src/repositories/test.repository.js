
export class TestRepository {

    constructor() {
        this.trainings = [];
    }

    findAll = ()=> {
        return this.trainings;
    }

    create = (training)=> {
        this.trainings.push(training);

        return training;
    }
}
