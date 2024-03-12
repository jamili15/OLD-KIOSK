const bplsitem = [
  { id: "billing", title: "Business Online Billing and Payment" },
  // { id: "newbusiness", title: "Business Registration" },
  // { id: "renewbusiness", title: "Business Application" },
];

function getBpls() {
  return bplsitem;
}

function getBplsId(id) {
  return bplsitem.find((bplsitem) => bplsitem.id === id);
}

module.exports = {
  bplsitem,
  getBpls,
  getBplsId,
};
