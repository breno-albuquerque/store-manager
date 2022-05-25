const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../db');

const productExample1 = {
  id: 1,
  name: "Produto X",
  quantity: 10
}

const productExample2 = {
  id: 2,
  name: "Produto Y",
  quantity: 15
}

describe('Busca todos produtos', () => {
  before(async () => {
    const dataMock = [[productExample1, productExample2]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const products = await productsModel.getAll();

      expect(products).to.be.an('array');
      expect(products[0]).to.be.an('object');
    });
    it('Objetos possuem as chaves corretas', async () => {
      const products = await productsModel.getAll();

      expect(products[0]).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Busca produto por id', () => {
  before(async () => {
    const dataMock = [[productExample1]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objeto', async () => {
      const product = await productsModel.getById(1);

      expect(product).to.be.an('array');
      expect(product[0]).to.be.an('object');
    });
    it('O array possui apenas um objeto', async () => {
      const product = await productsModel.getById(1);

      expect(product).to.have.length(1);
    });
    it('O objeto possui o id correto', async () => {
      const product = await productsModel.getById(1);

      expect(product[0]).to.have.property('id');
      expect(product[0].id).to.equal(1);
    });
  });
})