import Imagen from "./imagen.model.interface"

export default interface Formulario {
    nombreSistema: string,
    versionSistema: string,
    usuarioNombre: string,
    celularAxeso: string,
    sede: string,
    cargo: string,
    personaReporte: string,
    celularPersona: string
    fecha: string,
    descripcion: string,
    descartes: string,
    descarteAcepta: string,
    imagenes: Imagen[]
}