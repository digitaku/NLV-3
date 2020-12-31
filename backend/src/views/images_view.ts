import Image from "../models/Images";
//lembrar que ao invez de usar o caminho em baixo de melhor usar variaveis de ambiente
export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },
  renderMany(image: Image[]) {
    return image.map((image) => this.render(image));
  },
};
