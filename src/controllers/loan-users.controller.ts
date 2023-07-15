import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Loan,
  Users,
} from '../models';
import {LoanRepository} from '../repositories';

export class LoanUsersController {
  constructor(
    @repository(LoanRepository)
    public loanRepository: LoanRepository,
  ) { }

  @get('/loans/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Loan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Loan.prototype.id,
  ): Promise<Users> {
    return this.loanRepository.LoanUser(id);
  }
}
