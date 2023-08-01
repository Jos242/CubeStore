const { PrismaClient, TipoUsuario } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listTipos = [];
  for (let element in TipoUsuario) {
    switch (element) {
      case TipoUsuario.ADMIN:
        listTipos.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
        case TipoUsuario.CLIENTE:
            listTipos.unshift({
            ["id"]: element,
            ["nombre"]: "Cliente",
          });
          break;
        case TipoUsuario.VENDEDOR:
            listTipos.unshift({
                ["id"]: element,
                ["nombre"]: "Vendedor",
            });
            break;
      default:
        listTipos.unshift({ ["id"]: TipoUsuario.ADMIN, ["nombre"]: "Administrador" });
        break;
    }
  }

  response.json(listTipos);
};

module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (TipoUsuario[id]) {
    case TipoUsuario.ADMIN:
      nombre = "Administrador";
      break;
    case TipoUsuario.CLIENTE:
        nombre = "Cliente";
        break;
    case TipoUsuario.VENDEDOR:
      nombre = "Vendedor";
      break;
    default:
      nombre = "Administrador";
      break;
  }
  let tipousuario = { ["id"]: TipoUsuario[id], ["nombre"]: nombre };
  response.json(tipousuario);
};
