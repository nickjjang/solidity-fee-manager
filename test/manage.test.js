const ExampleToken = artifacts.require("ExampleToken");
const ManageContract = artifacts.require("ManageContract");
const BigNumber = require("bignumber.js");

contract("ManageContract", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const users = [user1, user2];

  before(async () => {
    exampleToken = await ExampleToken.deployed();
    manageContract = await ManageContract.deployed();
  });

  describe("Testing", () => {
    it("Testing transfer.", async () => {
      await exampleToken.approve(manageContract.address, 200);
      await manageContract.transfer(users, 200, { from: owner });
      assert.equal(await manageContract.getFee(), 2);
      assert.equal(await exampleToken.balanceOf(user1), 99);
      assert.equal(await exampleToken.balanceOf(user2), 99);
      await manageContract.withdrawFee(1, { from: owner });
      await manageContract.withdrawFee(1, { from: owner });
      assert.equal(await exampleToken.balanceOf(owner), 10000 - 200 + 2);
    });
  });
});
