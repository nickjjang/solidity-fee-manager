const ExampleToken = artifacts.require("ExampleToken");
const ManageContract = artifacts.require("ManageContract");

module.exports = async function (deployer) {
  await deployer.deploy(ExampleToken);
  await deployer.deploy(ManageContract, ExampleToken.address);
};
