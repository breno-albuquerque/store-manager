const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../db');

const productExample = {
  id: 1,
  name: "Martelo de Thor",
  quantity: 10
}

describe('Busca todos produtos', () => {
  before(async () => {
    const dataMock = [[productExample]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const products = await productsModel.getAll();

      expect(products).to.be.a('array');
      expect(products[0]).to.be.a('object');
    });
    it('Objetos possuem as chaves corretas', async () => {
      const products = await productsModel.getAll();

      expect(products[0]).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

