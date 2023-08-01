const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { TipoUsuario } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

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
            tipoUsuario: TipoUsuario[userData.tipoUsuario]
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
    });
    
    //Sino lo encuentra según su email
    if (!user) {
        response.status(401).send({
            success: false,
            message: "Usuario no registrado",
        });
    }

    const checkClave = await bcrypt.compare(userReq.clave, user.clave);
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
            tipoUsuario: user.tipoUsuario
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
};