class Bingo {
  
  constructor(nParticipantes, tamTabela) {
    this.nParticipantes = nParticipantes;
    this.tamTabela = tamTabela;
    this.gerados = [];
  }

  geraNumero(max) {
    while(1) {
      let num = Math.floor(Math.random() * (max - 1) + 1);
      if(this.gerados.indexOf(num) == -1) {
        this.gerados.push(num);
        return num;
      }
    }
  }

  static gerarTabelas(nParticipantes, tamTabela) {}
}

module.exports =  Bingo;