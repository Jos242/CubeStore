const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
        orderBy: {
            id: 'asc',
          },
    });
    response.json(usuarios);
};

module.exports.update = async (request, response, next) => {
    const usuario = request.body;
    let idUsuario = parseInt(request.params.id);
    
    const newUsuario = await prisma.usuario.update({
      where: {
        id: idUsuario,
      },
      data: {
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        clave: usuario.clave,
        estado: usuario.estado,
      },
    });
    response.json(newUsuario);
};

module.exports.register = async (request, response, next) => {
    const userData = request.body;

    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt = bcrypt.genSaltSync(10);
    console.log(userData.clave + " " + salt); 
    let hash = bcrypt.hashSync(userData.clave, salt);
    const user = await prisma.usuario.create({
        data: {
            nombre: userData.nombre,
            correo: userData.correo,
            telefono: userData.telefono,
            clave: hash,
            estado: 1,
            tiposUsuario: {
              createMany: {
                data: userData.tiposUsuario.map(tipo => {
                  return {
                    tipoUsuario: tipo,
                  };
                }),
              },
            }
        }
    });
    response.status(200).json({
        status: true,
        message: "Usuario creado",
        data: user,
    });
};

module.exports.login = async (request, response, next) => {
    let userReq = request.body;

  //Buscar el usuario según el email dado
    const user = await prisma.Usuario.findUnique({
        where: {
            correo: userReq.correo,
        },
        include: {
          tiposUsuario: true
        }
    });
    //Sino lo encuentra según su email
    if (!user) {
      response.status(401).send({
        success: false,
        message: "Usuario no registrado",
      });
    } else {

      if (user.estado == 0) {
        response.status(401).send({
          success: false,
          message: "Usuario denegado",
        });
      } else {
        const checkClave = await bcrypt.compare(userReq.clave, user.clave);
        console.log(userReq)
        if(checkClave === false){
            response.status(401).send({
                success: false,
                message: "Credenciales no validas"
            })
        } else {
            //Usuario correcto
            //Crear el payload
            const payload = {
                correo: user.correo,
                tipoUsuario: user.tiposUsuario
            }
            //Crear el token
            const token= jwt.sign(payload,process.env.SECRET_KEY,{
              expiresIn: process.env.JWT_EXPIRE
            });
            response.json({
              success: true,
              message: "Usuario registrado",
              data: {
                user,
                token,
              }
            })
        }
      }
    }
};