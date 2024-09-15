class AdjacencyList {
  #list;

  constructor() {
    this.#list = [];
  }

  addNeighbors(neighbors) {
    this.#list.push(neighbors);
  }

  getNeighbors(vertixID) {
    return this.#list[vertixID];
  }

  printList() {
    console.log(this.#list);
  }
}

export default AdjacencyList;
