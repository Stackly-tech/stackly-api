export interface BaseStudentInterface<T> {
    findAll() : Promise<T[]>
}