const chai = require('chai')
const sinon = require('sinon');

chai.use(require('chai-as-promised'))

const { expect } = chai;
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const MyError = require('../../../helpers/MyError');

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

describe('Busca todos produtos no service', () => {
  describe('Em caso de sucesso', () => {
    before(async () => {
      const modelMock = [productExample1, productExample2];

      sinon.stub(productsModel, 'getAll').resolves(modelMock)
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('productsModel.getAll deve ser chamada sem argumentos', async () => {
      await productsService.getProducts();

      expect(productsModel.getAll.calledWith()).to.equal(true);
    });
    it('Retorna um array de objetos', async () => {
      const products = await productsService.getProducts();

      expect(products).to.be.an('array');
      expect(products[0]).to.be.an('object');
    });
  });
});

describe('Busca produto por id no service', () => {
  describe('Em caso de id inválido', () => {
    before(async () => {
      const modelMock = [];
  
      sinon.stub(productsModel, 'getById').resolves(modelMock)
    });
  
    after(async () => {
      productsModel.getById.restore();
    });
    
    it('Uma excessão deve ser lançada com a mensagem "Product not found"', async () => {
      await expect(productsService.getProducts('id inválido'))
        .to.be.rejectedWith(new MyError, 'Product not found');
    });
  });
  describe('Em caso de id válido', () => {
    before(async () => {
      const modelMock = [productExample1];
  
      sinon.stub(productsModel, 'getById').resolves(modelMock)
    });
  
    after(async () => {
      productsModel.getById.restore();
    });

    it('Deve retornar um objeto', async () => {
      const product = await productsService.getProducts(1);

      expect(product).to.be.an('object');
    })
  });
});