import { Estado } from "@prisma/client";

export const productos = [
    //1
    {
        idUsuario: 3,
        idCategoria: 1,
        nombre: "X-Man Tornado V3 M Standard 3x3",
        descripcion: "El X-Man Tornado V3 M es el nuevo speedcube insignia 3x3 de QiYi. Este rompecabezas tiene un rendimiento increíble y una fácil personalización. X-man ha lanzado 3 versiones, introduciendo imanes centrales y tecnología maglev en la línea Tornado. Resuelve algunos pequeños problemas que estaban presentes en el V2, como reemplazar los remaches con tornillos y permitir que las tapas centrales encajen desde cualquier orientación.",
        precio: 25,
        cantidad: 100,
        estado: Estado.NUEVO,
        // preguntas: {
        //     connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
        // },
        // atributos: {
        //     connect: [{ id: 1 }] 
        // },
        // facturas: {
        //     connect: [{ id: 1 }] 
        // }
    }, 
    {
        idUsuario: 3,
        idCategoria: 2,
        nombre: "DNM-37",
        descripcion: "DNM-37 es un lubricante para piezas a base de agua diseñado por Cubicle Labs que crea una explosión de velocidad refrescante y duradera para sus rompecabezas. Este lubricante está especialmente formulado para absorber y retener la humedad del aire, lo que le permite mantener su eficacia durante un largo período de tiempo. DNM-37 ha sido diseñado para funcionar bien en rompecabezas de todos los tamaños, incluidos minxes, square-1s y big cubes.",
        precio: 10,
        cantidad: 50,
        estado: Estado.NUEVO,
        // preguntas: {
        //     connect: [{ id: 3 }]
        // },
        // atributos: {
        //     connect: [{ id: 2 }] 
        // },
        // facturas: {
        //     connect: [{ id: 2 }, { id: 4 }] 
        // }
    },  
    {
        idUsuario: 3,
        idCategoria: 3,
        nombre: "SpeedStacks Gen4 Mat (Voxel Glow)",
        descripcion: "The SpeedStacks Gen4 Mat is a comfortable, soft surface that features latches to mount onto the StackMat Pro Timer Gen4. Its compact form factor makes it ideal for use on smaller tables.",
        precio: 15,
        cantidad: 10,
        estado: Estado.NUEVO,
        // preguntas: {
        //     connect: [{ id: 4 }]
        // },
        // atributos: {
        //     connect: [{ id: 3}] 
        // },
        // facturas: {
        //     connect: [{ id: 3 }, { id: 5 }] 
        // }
    },  
    {
        idUsuario: 5,
        idCategoria: 1,
        nombre: "MoYu AoSu 4x4 WR M",
        descripcion: "El MoYu AoSu 4x4 WR M es el sucesor del exitoso MoYu AoSu GTS2 M. ¡Este cubo de velocidad magnético 4x4 presenta un tamaño nuevo, más pequeño y más controlable de 59 mm, así como un sistema de posicionamiento actualizado y nuevos tonos brillantes sin calcomanías!",
        precio: 40,
        cantidad: 25,
        estado: Estado.NUEVO,
    },   
    {
        idUsuario: 5,
        idCategoria: 1,
        nombre: "MoYu AoChuang 5x5 GTS M",
        descripcion: "El MoYu AoChuang 5x5 GTS M es un cubo de velocidad 5x5 relativamente rápido y burbujeante con capas exteriores más grandes para un escenario 3x3 más cómodo. Esta versión viene magnetizada de fábrica y tiene una sensación magnética media.",
        precio: 50,
        cantidad: 2,
        estado: Estado.USADO_BUEN_ESTADO,
    },    
];