const chai = require('chai')
const sinon = require('sinon');

chai.use(require('chai-as-promised'));

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

const { expect } = chai;

const completeSale1 = {
  sale_id: 1,
  date: "2021-09-09T04:54:29.000Z",
  product_id: 1,
  quantity: 2
}

const completeSale2 = {
  sale_id: 1,
  date: "2021-09-09T04:54:54.000Z",
  product_id: 2,
  quantity: 2
}

describe('Busca todas vendas no service', () => {
  before(async () => {
    const modelMock = [completeSale1, completeSale2];

    sinon.stub(salesModel, 'getAll').resolves(modelMock);
  });
  after(async () => {
    salesModel.getAll.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const result = await salesService.getSales();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object')
    });
  });
});

/* describe('Busca venda por id no service', () => {
  describe('Em caso de id válido', () => {
    it('Retorna um array de objetos', () => {

    });
    it('Os objetos possuem as chaves corretas', () => {

    });
  });
  describe('Em caso de id inválido', () => {
    it('Uma excessão deve ser lançada com a mensagem "Sale not found"', () => {

    });
  });
}); */