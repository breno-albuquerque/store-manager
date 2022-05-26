const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../db');

const saleExample1 = {
  saleId: 1,
  date: "2021-09-09T04:54:29.000Z",
  productId: 1,
  quantity: 2
}

const saleExample2 = {
  saleId: 1,
  date: "2021-09-09T04:54:54.000Z",
  productId: 2,
  quantity: 2
}

describe('Busca todas vendas no model', () => {
  before(async () => {
    const dataMock = [[saleExample1]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });
    it('O objeto possui as chaves corretas', async () => {
      const result = await salesModel.getAll();

      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});