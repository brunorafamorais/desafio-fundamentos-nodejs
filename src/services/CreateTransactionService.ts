import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const { total: totalBalance } = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && transaction.value > totalBalance) {
      throw new Error('Limite de transação excedido.');
    }

    return transaction;
  }
}

export default CreateTransactionService;
