import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsQuestionnaire, LmsQuestionnaireRelations} from '../models';

export class LmsQuestionnaireRepository extends DefaultCrudRepository<
  LmsQuestionnaire,
  typeof LmsQuestionnaire.prototype.id,
  LmsQuestionnaireRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LmsQuestionnaire, dataSource);
  }
}
